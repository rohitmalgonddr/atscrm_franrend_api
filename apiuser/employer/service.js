const Boom = require('@hapi/boom');
const DB = require('../../storage/model');
const { QueryTypes } = require('sequelize');
const auth = require('../../utility/auth');
const { Op } = require("sequelize");
// const auth = require('../utility/auth');
// const {uploadStreamToS3} = require('../utility/upload-to-s3');
// const {getSignedUrl} = require('../utility/getSignedUrl');
const { EMAIL_PLAN_TYPE, ServerStatusCode, CommonErrorMessage } = require('../../utility/constant');

const bucket = '';

const getMyEmployeeService = async (req) => {

  try {

    const credentials = await auth(req);
    const employee = await DB.employee.findOne({
      attributes: ['cdomain'],
      where: { empid: credentials.dbUserId }
    })
    const employeeWhere = { cdomain: employee.cdomain, profiletype: 'employee' };
    const employersWhere = {};
    const useremailsWhere = {};
    // const favoriteWhere = {};
    if (req.body.fromdate && req.body.enddate) {
      employeeWhere[Op.and] = {
        create_date: {
          [Op.gte]: req.body.fromdate,
          [Op.lte]: req.body.enddate
        }
      }
    } else {
      if (req.body.fromdate) {
        employeeWhere.create_date = { [Op.gte]: `${req.body.fromdate}` };
      }
      if (req.body.enddate) {
        employeeWhere.create_date = { [Op.lte]: req.body.enddate };
      }
    }


    if (req.body.userstatus) {
      employeeWhere.status = req.body.userstatus;
    }

    // if (payload.user_group) {
    //     employeeWhere.jobCatagiory = { [Op.like]: '%' + payload.user_group + '%' };
    // }
    if (req.body.emailstatus) {
      useremailsWhere.status = { [Op.like]: '%' + req.body.emailstatus + '%' };
    }


    if (req.body.search) {
      employeeWhere[Op.or] = {
        //  '$employers.cdomain$' : {
        //     [Op.like] : `%${payload.search}%`
        //    },
        firstname: {
          [Op.like]: `%${req.body.search}%`
        },
        lastname: {
          [Op.like]: `%${req.body.search}%`
        },
        office_email: {
          [Op.like]: `%${req.body.search}%`
        },
        designation: {
          [Op.like]: `%${req.body.search}%`
        }
      }
    }


    // favoriteWhere.item_type = 'employer';
    const data = await DB.employee.findAndCountAll({
      attributes: ['empid', 'jobCatagiory', 'firstname', 'lastname', 'office_email', 'officialphone1', 'officialphone2', 'p_pcode', 's_pcode', 'designation', 'status', 'countryofresidence', 'stateofresidence', 'city', 'ZipCode', 'create_date', 'created_by'],
      where: employeeWhere,
      include: [
        {
          attributes: ['isvarified', 'status'],
          required: req.body.emailstatus === 'Unverified' ? false : !req.body.emailstatus ? false : true,
          where: useremailsWhere,
          model: DB.useremails
        },
        // {
        //     attributes: ['id'],
        //     required: payload.isFav ? true : false,
        //     where: favoriteWhere,
        //     model: DB.favorite
        // }
      ],
      limit: req.body.limit,
      offset: req.body.offSet,
      order: [
        ['empid', 'Desc']
      ],

    });
    return {
      IsError: false,
      msg: "Invalid official email domain",
      response:data
    }

  } catch (DBException) {
    return Boom.badRequest(DBException.message);
  }






}

const addEmployeeService = async (req) => {
  try {
    const credentials = await auth(req);
    let mailArr = (credentials.dbEmail).split('@');
    let mailHost = mailArr[1];
    let officailEmail = (req.body.officailEmail).split('@');
    let domain = officailEmail[1];
    const data = await DB.employee.findOne({
      where: { office_email: req.body.officailEmail }
    })

    if (data) {
      return { IsError: true, errorMsg: " Official email address already exsist" }
    }
    if (mailHost !== domain) {
      return { IsError: true, errorMsg: "Invalid official email domain" }
    }
    // create new record
    await DB.employee.create({
      cdomain: domain,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      office_email: req.body.officailEmail,
      p_pcode: req.body.phoneCode1,
      officialphone1: req.body.phone1,
      officialphone1extention: req.body.ext1,
      s_pcode: req.body.phoneCode2,
      officialphone2: req.body.phone2,
      officialphone2extention: req.body.ext2,
      designation: req.body.designation,
      gender: req.body.gender,
      email: req.body.personalEmail,
      phone: req.body.personalPhoneNumber,
      dob: req.body.dob,
      address: req.body.address,
      countryofresidence: req.body.country,
      stateofresidence: req.body.state,
      city: req.body.city,
      ZipCode: req.body.zipcode,
      linkedinurl: req.body.Linkedin,
      twitterurl: req.body.Twitter,
      whattsupno: req.body.whatsapp,
      facebookurl: req.body.facebook,
      yahooid: req.body.yahoo,
      profiletype: 'employee',
      created_by: credentials.dbEmail,
      uid: credentials.dbUserId,
      utype: credentials.dbusertype,

    })
    return { IsError: false, errorMsg: "" }
  } catch (DBException) {
    console.log(DBException);
    return { IsError: true, errorMsg: CommonErrorMessage.SomethingError }
  }
}

// get employer profile
const getEmployeeById = async (req, res) => {
  try {
    console.log(req.query.id);
    const data = await DB.employee.findOne({
      where: { empid: req.query.id }
    });

    return {
      IsError: false,
      msg: "",
      response:data
    }
  } catch (DBException) {
    return Boom.badRequest(DBException.message);
  }

}

// updateEmployeeInfo profile
const updateEmployeeInfo = async (req, res) => {
  try {  
    const obj ={
      office_email: req.body.office_email,
      p_pcode:  req.body.p_pcode,
      officialphone1:  req.body.officialphone1,
      officialphone1extention: req.body.officialphone1extention,
      s_pcode: req.body.s_pcode,
      officialphone2: req.body.officialphone2,
      officialphone2extention: req.body.officialphone2extention,   
      jobCatagiory: req.body.jobCatagiory,    
      summary: req.body.summary,    
      status: req.body.status,    

    }
   
    const data = await DB.employee.update(obj,{
      where: { empid: req.body.id }
    });

    return {
      IsError: false,
      msg: "",
      response:data
    }
  } catch (DBException) {
    return Boom.badRequest(DBException.message);
  }

}
// updateSocialInfo profile
const updateSocialInfo = async (req, res) => {
  try {

    const obj ={
      facebookurl: req.body.facebookurl,
      linkedinurl:  req.body.linkedinurl,
      skype:  req.body.skype,
      twitterurl: req.body.twitterurl,
      whatsappcode: req.body.whatsappcode,
      whattsupno: req.body.whattsupno,
      yahooid: req.body.yahooid,    
    }
   console.log(obj);
    const data = await DB.employee.update(obj,{
      where: { empid: req.body.id }
    });

    return {
      IsError: false,
      msg: "",
      response:data
    }
  } catch (DBException) {
    return Boom.badRequest(DBException.message);
  }

}

// updatePersonalInfo profile
const updatePersonalInfo = async (req, res) => {
  try {

    const obj ={
      firstname: req.body.firstname,
      lastname:  req.body.lastname,
      designation:  req.body.designation,
      gender: req.body.gender,
      email: req.body.email,
      phonecode: req.body.phonecode,
      phone: req.body.phone,  
      dob: req.body.dob,    
      address: req.body.address,    
      stateofresidence: req.body.stateofresidence,    
      city: req.body.city,    
      stateofresidence: req.body.stateofresidence,    
      countryofresidence: req.body.countryofresidence,    
      ZipCode: req.body.ZipCode,    

    }
    const data = await DB.employee.update(obj,{
      where: { empid: req.body.id }
    });

    return {
      IsError: false,
      msg: "",
      response:data
    }
  } catch (DBException) {
    return Boom.badRequest(DBException.message);
  }

}


module.exports = {
  getMyEmployeeService,
  addEmployeeService,
  getEmployeeById,
  updateEmployeeInfo,
  updateSocialInfo,
  updatePersonalInfo
};
