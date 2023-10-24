
const Boom = require('@hapi/boom');
const DB = require('../../../storage/model');
const { QueryTypes } = require('sequelize');
const auth = require('../../../utility/auth');
const { Op } = require("sequelize");
// const auth = require('../utility/auth');
// const {uploadStreamToS3} = require('../utility/upload-to-s3');
// const {getSignedUrl} = require('../utility/getSignedUrl');
const { EMAIL_PLAN_TYPE, ServerStatusCode, CommonErrorMessage } = require('../../../utility/constant');

const bucket = '';





// getConsultantFilterList profile
const getConsultantFilterList = async (req, res) => {
    try {
       
        const payload =req.query;
        let hostListWhere = `h.profiletype ='p'`;
        let consulatntWhere = ``;
        if(payload.userstatus==='Deleted') {
          consulatntWhere = `consultant.id!=''`;
        } else {
           consulatntWhere = `consultant.daleteddate is null`;
        }
        let empTypeWhere = {};
        let visaWhere = {};
        let stateWhere = {};
        let taxtermwhere = {};
        let explevel = {};
        const obj = { visa: '' };
        const employment_type_list = await DB.employment_type_list.findAll({
          attributes: ['id', 'list_name', 'description'],
          where: { status: 'APPROVED' },
          order: [
            ['list_name', 'ASC']
          ],
        });
     
  
  
  
  
        /// visa 
        const visa_list = await DB.visa_list.findAll({
          attributes: ['id', 'visa_listname', 'description'],
          where: { status: 'APPROVED' },
          order: [
            ['visa_listname', 'ASC']
          ],
        });
  

  
        // state where
        const state_list = await DB.state_list.findAll({
          attributes: ['id', 'list_name', 'description'],
          where: { status: 'APPROVED' },
          order: [
            ['list_name', 'ASC']
          ],
        });
  

        // tax term
        const tax_term_list = await DB.tax_term_list.findAll({
          attributes: ['id', 'list_name', 'description'],
          where: { status: 'APPROVED' },
          order: [
            ['list_name', 'ASC']
          ],
        });
  
    
        const experience_level_list = await DB.experience_level_list.findAll({
          attributes: ['id', 'list_name', 'description'],
          where: { status: 'APPROVED' },
          order: [
            ['list_name', 'ASC']
          ],
        });
  
  
        if (payload.rbs) {
          hostListWhere += await getBooleanCondition(payload.rbs, 'h.resume_text');
        }
  
        if (payload.skill_set_bollean_search) {
          hostListWhere += await getBooleanCondition(payload.skill_set_bollean_search, 'h.skillSet');
        }
  
  
        if (payload.job_title) {
          hostListWhere += await getBooleanCondition(payload.job_title, 'h.role');
        }
  
        if (payload.fromdate) {
          from_date1 = payload.fromdate.split('-');
          from_date1 = from_date1[2] + '-' + from_date1[0] + '-' + from_date1[1];
          hostListWhere += ` AND (date(consultant.created_date)>=date('${from_date1}'))`;
        }
        if (payload.enddate) {
          enddate1 = payload.enddate.split('-');
          enddate1 = enddate1[2] + '-' + enddate1[0] + '-' + enddate1[1];
          hostListWhere += ` AND (date(consultant.created_date)<=date('${enddate1}'))`;
        }
        if (payload.search) {
          hostListWhere += " AND (";
          hostListWhere += " h.firstname " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.lastname " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  consultant.primary_mail " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.primary_phone " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          /// hostListWhere += " OR `h.technology`" + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          // hostListWhere += " OR `h.specialized_skill`" + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          // hostListWhere += " OR `h.total_exp`" + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.position_type " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.visa " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          //  hostListWhere += " OR `h.relocatte`" + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.current_city " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.current_state " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.current_zipcode " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.skillSet " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.status " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          //    hostListWhere += " OR `h.source`" + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.designation " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += " OR  h.tax_term " + "LIKE" + "'" + '%' + payload.search + '%' + "'";
          hostListWhere += ")";
        }
  
  
  
  
        let resumewhere = '';
        if (payload.resumeAttachment) {
          let resumeAttachment = JSON.parse(payload.resumeAttachment);
          resumewhere += 'AND (';
          for (let i = 0; i < resumeAttachment.length; i++) {
            if (resumeAttachment[i] == 'No') {
              if (i == 0) {
                resumewhere += `  h.resume = ''  or h.resume is  null `;
              } else {
                resumewhere += ` or  h.resume = ''  or h.resume is  null `;
              }
            }
            if (resumeAttachment[i] == 'Yes') {
              if (i == 0) {
                resumewhere += `  h.resume != '' `;
              } else {
                resumewhere += ` or  h.resume != ''  `;
              }
            }
          }
          resumewhere += ')';
        }
  
  
        let visawhere = '';
        if (payload.visalist) {
          let visalistcheckbox = JSON.parse(payload.visalist);
  
          visawhere += ' AND (';
          for (let i = 0; i < visalistcheckbox.length; i++) {
            if (i == 0) {
              visawhere += " h.visa " + "LIKE" + "'" + '%' + visalistcheckbox[i] + '%' + "'";
            } else {
              visawhere += " OR h.visa " + "LIKE" + "'" + '%' + visalistcheckbox[i] + '%' + "'";
            }
          }
      
          visawhere += ')';
        }
  
  
        let TaxTermWhere = '';
        if (payload.taxTerm) {
          let TaxTerm_checkbox = JSON.parse(payload.taxTerm);;
          TaxTermWhere += 'AND (';
          for (let i = 0; i < TaxTerm_checkbox.length; i++) {
            if (i == 0) {
              TaxTermWhere += " h.tax_term " + "LIKE" + "'" + '%' + TaxTerm_checkbox[i] + '%' + "'";
            } else {
              TaxTermWhere += " OR h.tax_term " + "LIKE" + "'" + '%' + TaxTerm_checkbox[i] + '%' + "'";
            }
          }
          TaxTermWhere += ')';
        }
  
  
        let EmploymentTypewhere = '';
        if (payload.jobType) {
          let EmploymentTypecheckbox = JSON.parse(payload.jobType);
  
          EmploymentTypewhere += 'AND (';
          for (let i = 0; i < EmploymentTypecheckbox.length; i++) {
            if (i == 0) {
              EmploymentTypewhere += " h.emp_type " + "LIKE" + "'" + '%' + EmploymentTypecheckbox[i] + '%' + "'";
            } else {
              EmploymentTypewhere += " OR h.emp_type " + "LIKE" + "'" + '%' + EmploymentTypecheckbox[i] + '%' + "'";
            }
          }
          EmploymentTypewhere += ')';
        }
  
  
        let ExperienceLevelWhere = '';
        if (payload.experienceLevel) {
          let ExperienceLevelcheckbox = JSON.parse(payload.experienceLevel);
  
          ExperienceLevelWhere += 'AND (';
          for (let i = 0; i < ExperienceLevelcheckbox.length; i++) {
            if (i == 0) {
              ExperienceLevelWhere += " h.position_type " + "LIKE" + "'" + '%' + ExperienceLevelcheckbox[i] + '%' + "'";
            } else {
              ExperienceLevelWhere += " OR h.position_type " + "LIKE" + "'" + '%' + ExperienceLevelcheckbox[i] + '%' + "'";
            }
          }
          ExperienceLevelWhere += ')';
        }
  
  
  
        let statewhere = '';
        if (payload.state) {
          let state_checkbox = JSON.parse(payload.state);
          statewhere += 'AND (';
          for (let i = 0; i < state_checkbox.length; i++) {
            if (i == 0) {
              statewhere += " h.current_state " + "LIKE" + "'" + '%' + state_checkbox[i] + '%' + "'";
            } else {
              statewhere += " OR h.current_state " + "LIKE" + "'" + '%' + state_checkbox[i] + '%' + "'";
            }
          }
          statewhere += ')';
        }
  
  
        let emailStatusWhere = '';
        if (payload.emailstatus && payload.emailstatus !== 'unverified') {
          emailStatusWhere += ` AND (useremails.status='${payload.emailstatus}')`;
        }
  
  
        let join = '';
        search_favourite = 'all';
        join = `INNER JOIN hotlist h ON h.cid = consultant.id and ${hostListWhere}`;
  
  
        if (emailStatusWhere && payload.emailstatus !== 'unverified') {
          join += `inner JOIN useremails   useremails  ON useremails.email = consultant.primary_mail  ${emailStatusWhere}`;
  
        } else if (payload.emailstatus === 'unverified') {
          join += `left JOIN useremails   useremails  ON useremails.email = consultant.primary_mail  
                    `;
          consulatntWhere += `and  not exists  
                    ( 
                    select 1 from 
                    useremails 
                    where email = consultant.primary_mail
                    ) `;
  
        } else {
          join += ` left JOIN useremails   useremails  ON useremails.email = consultant.primary_mail`;
        }
  
        let resumeAttachmentList = ['No', 'Yes'];
        if (resumeAttachmentList.length > 0) {
          let sql = `SELECT`;
          let filterWhere = hostListWhere + visawhere + ExperienceLevelWhere + EmploymentTypewhere + TaxTermWhere + statewhere;
  
          sql += ` COUNT(CASE WHEN  h.resume !='' THEN 1 END) AS resumeAttachmentYes `;
          sql += ` , COUNT(CASE WHEN h.resume is null   or h.resume ='' THEN 1 END) AS resumeAttachmentNo `;
  
          sql += `FROM consultant ${join}  where ${filterWhere}`;
          let result1 = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
          obj.resume = result1;
        }
  
        // get visa count 
        if (visa_list.length > 0) {
          let sql = `SELECT`;
          let filterWhere = hostListWhere + ExperienceLevelWhere + EmploymentTypewhere + TaxTermWhere + statewhere + resumewhere;
          for (let i = 0; i < visa_list.length; i++) {
            sql += ` COUNT(CASE WHEN h.visa LIKE '%${visa_list[i]['visa_listname']}%' THEN 1 END) AS '${visa_list[i]['visa_listname']}'`;
            if (i < visa_list.length - 1) {
              sql += `,`;
            }
          }
          sql += `FROM consultant ${join}  where ${filterWhere}`;
          let result1 = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
          obj.visa = result1;
        }
  
  
        if (experience_level_list.length > 0) {
          let sql = `SELECT`;
          let filterWhere = hostListWhere + visawhere + EmploymentTypewhere + TaxTermWhere + statewhere + resumewhere;
          for (let i = 0; i < experience_level_list.length; i++) {
            sql += ` COUNT(CASE WHEN h.position_type LIKE '%${experience_level_list[i]['list_name']}%' THEN 1 END) AS '${experience_level_list[i]['list_name']}'`;
  
            if (i < experience_level_list.length - 1) {
              sql += `,`;
            }
          }
          sql += `FROM consultant ${join}  where ${filterWhere}`;
          let result1 = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
          obj.experienceLevel = result1;
        }
  
  
        if (employment_type_list.length > 0) {
          let sql = `SELECT`;
          let filterWhere = hostListWhere + visawhere + ExperienceLevelWhere + TaxTermWhere + statewhere + resumewhere;
  
          for (let i = 0; i < employment_type_list.length; i++) {
            sql += ` COUNT(CASE WHEN h.emp_type LIKE '%${employment_type_list[i]['list_name']}%' THEN 1 END) AS '${employment_type_list[i]['list_name']}'`;
            if (i < employment_type_list.length - 1) {
              sql += `,`;
            }
          }
  
          sql += `FROM consultant ${join}  where ${filterWhere}`;
          let result1 = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
          obj.jobType = result1;
        }
  
        // get count tax term
        if (tax_term_list.length > 0) {
          let sql = `SELECT`;
          let filterWhere = hostListWhere + visawhere + ExperienceLevelWhere + EmploymentTypewhere + statewhere + resumewhere;
  
          for (let i = 0; i < tax_term_list.length; i++) {
            sql += ` COUNT(CASE WHEN h.tax_term LIKE '%${tax_term_list[i]['list_name']}%' THEN 1 END) AS '${tax_term_list[i]['list_name']}'`;
            if (i < tax_term_list.length - 1) {
              sql += `,`;
            }
          }
          sql += `FROM consultant ${join}  where ${filterWhere}`;
          let result1 = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
          obj.taxTerm = result1;
        }
  
  
        if (state_list.length > 0) { //get state count
          let sql = `SELECT`;
          let filterWhere = hostListWhere + visawhere + ExperienceLevelWhere + EmploymentTypewhere + TaxTermWhere + resumewhere;
          for (let i = 0; i < state_list.length; i++) {
            sql += ` COUNT(CASE WHEN ( h.current_state  LIKE '%${state_list[i]['list_name']}%' ) THEN 1 END) AS '${state_list[i]['list_name']}'`;
            if (i < state_list.length - 1) {
              sql += `,`;
            }
          }
          sql += `FROM consultant ${join}  where ${filterWhere}`;
          let result1 = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
          obj.state = result1;
        }


        return {
            IsError: false,
            msg: "",
            response:obj
          }
      } catch (DBException) {
      return Boom.badRequest(DBException.message);
    }
  
  }
  

module.exports = {
    getConsultantFilterList,
   
  };