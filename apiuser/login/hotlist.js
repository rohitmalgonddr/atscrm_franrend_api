const Joi = require('joi');
const Boom = require('@hapi/boom');
const DB = require('../../storage/model');
const { QueryTypes } = require('sequelize');

// const { Op } = require("sequelize");
// const auth = require('../utility/auth');
// const {uploadStreamToS3} = require('../utility/upload-to-s3');
// const {getSignedUrl} = require('../utility/getSignedUrl');

const bucket='';



const getHotListFilter = async(req)=>{
    try {
      const visa_list = await DB.visa_list.findAll({
        attributes: ['id', 'visa_listname', 'description'],
        where: { status: 'APPROVED' },
        order: [
          ['visa_listname', 'ASC']
        ],
      });

      const experience_level_list = await DB.experience_level_list.findAll({
        attributes: ['id', 'list_name', 'description'],
        where: { status: 'APPROVED' },
        order: [
          ['list_name', 'ASC']
        ],
      });

      const employment_type_list = await DB.employment_type_list.findAll({
        attributes: ['id', 'list_name', 'description'],
        where: { status: 'APPROVED' },
        order: [
          ['list_name', 'ASC']
        ],
      });

      const tax_term_list = await DB.tax_term_list.findAll({
        attributes: ['id', 'list_name', 'description'],
        where: { status: 'APPROVED' },
        order: [
          ['list_name', 'ASC']
        ],
      });


      const state_list = await DB.state_list.findAll({
        attributes: ['id', 'list_name', 'description'],
        where: { status: 'APPROVED' },
        order: [
          ['list_name', 'ASC']
        ],
      });

      return { visa_list: visa_list, experience_level_list: experience_level_list, employment_type_list: employment_type_list, tax_term_list: tax_term_list, state_list: state_list };
    } catch (DBException) {
      console.log('error =>', DBException);
      return Boom.badRequest(DBException.message);
    }

 
  }
  
  const getHotActiveList = async (req) => {
    const schema = Joi.object({
      limit: Joi.number().required(),
      offSet: Joi.number().required(),
      rbs: Joi.string().allow('', null),
      emailstatus: Joi.string().allow('', null),
      skill_set_bollean_search: Joi.string().allow('', null),
      job_title: Joi.string().allow('', null),
      search: Joi.string().allow('', null),
      userstatus: Joi.string().allow('', null),
      fromdate: Joi.string().allow('', null),
      enddate: Joi.string().allow('', null),
      updatestartDate: Joi.string().allow('', null),
      update_endtDate: Joi.string().allow('', null),
      update_endtDate: Joi.string().allow('', null),
      isFav: Joi.boolean().allow('', null),
      experienceLevel: Joi.string().allow('', null),
      taxTerm: Joi.string().allow('', null),
      state: Joi.string().allow('', null),
      resumeAttachment: Joi.string().allow('', null),
      location: Joi.string().allow('', null),
      keywords: Joi.string().allow('', null),
      jobType: Joi.array().allow('', null),
      expLevel: Joi.array().allow('', null),
      visalist: Joi.array().allow('', null)


    });
    const { error, value: payload } = schema.validate(req.body);
    if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
    try {
      
   
      let hostListWhere = ` h.profiletype ='p' `;
      let consulatntWhere = ``;
      let emailStatusWhere = '';
      if(payload.userstatus==='Deleted') {
        consulatntWhere = ` consultant.id!='' `;
      } else {
         consulatntWhere = ` consultant.daleteddate is null `;
      }
      if (payload.emailstatus && payload.emailstatus !== 'unverified') {
        emailStatusWhere += ` AND (useremails.status='${payload.emailstatus}') `;
      }

      if (payload.userstatus) {
        consulatntWhere += ` AND (consultant.status='${payload.userstatus}') `;
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

      if (payload.rbs) {
        hostListWhere += await getBooleanCondition(payload.rbs, 'h.resume_text');
      }

      if (payload.skill_set_bollean_search) {
        hostListWhere += await getBooleanCondition(payload.skill_set_bollean_search, 'h.skillSet');
      }


      if (payload.job_title) {
        hostListWhere += await getBooleanCondition(payload.job_title, 'h.role');
      }

      if (payload.resumeAttachment) {
        let resumeAttachment = JSON.parse(payload.resumeAttachment);
        hostListWhere += 'AND (';
        for (let i = 0; i < resumeAttachment.length; i++) {
          if (resumeAttachment[i] == 'No') {
            if (i == 0) {
              hostListWhere += `  h.resume = ''  or h.resume is  null `;
            } else {
              hostListWhere += ` or  h.resume = ''  or h.resume is  null `;
            }
          }
          if (resumeAttachment[i] == 'Yes') {
            if (i == 0) {
              hostListWhere += `  h.resume != '' `;
            } else {
              hostListWhere += ` or  h.resume != ''  `;
            }
          }
        }
        hostListWhere += ')';
      }

      if (payload.visalist) {

        hostListWhere += ' AND (';
        for (let i = 0; i < visalistcheckbox.length; i++) {
          if (i == 0) {
            hostListWhere += " h.visa " + "LIKE" + "'" + '%' + visalistcheckbox[i] + '%' + "'";
          } else {
            hostListWhere += " OR h.visa " + "LIKE" + "'" + '%' + visalistcheckbox[i] + '%' + "'";
          }
        }
        // if (visalistcheckbox_empty == 'visalistcheckbox_empty') {
        //     hostListWhere += `OR h.visa = ''  or h.visa is null `;
        // }
        hostListWhere += ')';
      }

      if (payload.taxTerm) {
        let TaxTerm_checkbox = JSON.parse(payload.taxTerm);;
        hostListWhere += 'AND (';
        for (let i = 0; i < TaxTerm_checkbox.length; i++) {
          if (i == 0) {
            hostListWhere += " h.tax_term " + "LIKE" + "'" + '%' + TaxTerm_checkbox[i] + '%' + "'";
          } else {
            hostListWhere += " OR h.tax_term " + "LIKE" + "'" + '%' + TaxTerm_checkbox[i] + '%' + "'";
          }
        }

        // if (taxTerm_checkbox_empty == 'taxTerm_checkbox_empty') {
        //   where += `OR empr.tax_term=''  or empr.tax_term is null `;
        // }
        hostListWhere += ')';
      }

      if (payload.jobType) {

        hostListWhere += 'AND (';
        for (let i = 0; i < payload.jobType.length; i++) {
          if (i == 0) {
            hostListWhere += " h.emp_type " + "LIKE" + "'" + '%' + payload.jobType[i] + '%' + "'";
          } else {
            hostListWhere += " OR h.emp_type " + "LIKE" + "'" + '%' + payload.jobType[i] + '%' + "'";
          }
        }
        hostListWhere += ')';
      }


      if (payload.expLevel) {
        hostListWhere += ' AND (';
        for (let i = 0; i < payload.expLevel.length; i++) {
          if (i == 0) {
            hostListWhere += " h.position_type " + "LIKE" + "'" + '%' + payload.expLevel[i] + '%' + "'";
          } else {
            hostListWhere += " OR h.position_type " + "LIKE" + "'" + '%' + payload.expLevel[i] + '%' + "'";
          }
        }
        hostListWhere += ' ) ';
      }




      if (payload.state) {

        let state_checkbox = JSON.parse(payload.state);
        hostListWhere += 'AND (';
        for (let i = 0; i < state_checkbox.length; i++) {
          if (i == 0) {
            hostListWhere += " h.current_state " + "LIKE" + "'" + '%' + state_checkbox[i] + '%' + "'";
          } else {
            hostListWhere += " OR h.current_state " + "LIKE" + "'" + '%' + state_checkbox[i] + '%' + "'";
          }
        }

        hostListWhere += ')';
      }

     if(payload.location) {
      hostListWhere += " AND (";
      hostListWhere += " h.current_country " + "LIKE" + "'" + '%' + payload.location + '%' + "'";
      hostListWhere += " OR  h.current_state  " + "LIKE" + "'" + '%' + payload.location + '%' + "'";
      hostListWhere += " OR  h.current_city " + "LIKE" + "'" + '%' + payload.location + '%' + "'";
      hostListWhere += " OR  h.current_zipcode " + "LIKE" + "'" + '%' + payload.location + '%' + "'";
      hostListWhere += ")";
     }

     if(payload.keywords) {
      hostListWhere += " AND (";
      hostListWhere += " h.designation " + "LIKE" + "'" + '%' + payload.keywords + '%' + "'";
      hostListWhere += " OR  h.skillSet " + "LIKE" + "'" + '%' + payload.keywords + '%' + "'";
      hostListWhere += " OR  h.technology " + "LIKE" + "'" + '%' + payload.keywords + '%' + "'";
      hostListWhere += ")";
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
        join += `left JOIN useremails   useremails  ON useremails.email = consultant.primary_mail`;
      }
      //   if (search_favourite == 'favourite') {
      //     join = `INNER JOIN favorite_view   fav  ON fav.item_id = empr.id and fav.utype = '${dbusertype}' and fav.uid ='${dbUserId}' and fav.item_type='consultant'`;

      //   } else if (search_favourite == 'all') {
      //     join = `left JOIN favorite_view   fav  ON fav.item_id = empr.id  and fav.utype = '${dbusertype}' and fav.uid ='${dbUserId}' and fav.item_type='consultant'`;
      //   } else {
      //     join = `left JOIN favorite_view   fav  ON fav.item_id != empr.id  and fav.uid ='${dbUserId}' and fav.item_type='consultant'`;
      //   }

      let result1 = await DB.sequelize.query(`SELECT COUNT(DISTINCT  consultant.id) as totalcount FROM consultant ${join}  where ${consulatntWhere}  `, { type: QueryTypes.SELECT });
      let result2 = await DB.sequelize.query(`SELECT consultant.id,h.firstname,h.lastname,h.gender,h.primary_phone_code,h.primary_phone,h.s_phone_code,h.secoundary_phone,consultant.primary_mail	
              ,h.current_city,h.current_state,h.current_country,h.current_zipcode,h.role,h.designation,h.position_type,h.visa,h.emp_type,h.tax_term,h.contract_method,consultant.status,h.hourly_ratemin
              ,h.skillSet,h.created_date,h.modifieddate,h.technology,h.specialized_skill,h.total_exp,h.resume,useremails.status as emailStatus
              FROM  consultant  ${join} where ${consulatntWhere} GROUP BY consultant.id order by consultant.id desc limit ${payload.offSet}, ${payload.limit}`, { type: QueryTypes.SELECT });


      return {
        count: result1[0]['totalcount'],
        rows: result2
      }


    } catch (DBException) {
      return Boom.badRequest(DBException.message);
    }
  }

 

  async function routes(fastify) {
    fastify.post('/v1/outside/hotlist/getHotListFilter',getHotListFilter);
    fastify.post('/v1/outside/hotlist/getHotActiveList',getHotActiveList);
  }
module.exports= routes;
