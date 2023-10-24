const Joi = require('joi');
const { apiErrorRes, apiSuccessRes } = require('../../utility/commonResponse');
const { EMAIL_PLAN_TYPE,
  ServerStatusCode,
  CommonErrorMessage,
  CURD_MESSAGE
} = require('../../utility/constant');

const {
  getMyEmployeeService,
  addEmployeeService,
  getProfileService
} = require('../employer/service');

const service = require('../employer/service');
const Boom = require('@hapi/boom');

const addEmployeeController = async (req, res) => {
  const schema = Joi.object({
    firstname: Joi.string().allow('', null),
    lastname: Joi.string().allow('', null),
    officailEmail: Joi.string().required(),
    phoneCode1: Joi.string().allow('', null),
    phone1: Joi.string().allow('', null),
    ext1: Joi.string().allow('', null),
    phoneCode2: Joi.string().allow('', null),
    phone2: Joi.string().allow('', null),
    ext2: Joi.string().allow('', null),
    designation: Joi.string().allow('', null),
    gender: Joi.string().allow('', null),
    personalEmail: Joi.string().allow('', null),
    personalPhoneNumber: Joi.string().allow('', null),
    dob: Joi.string().allow('', null),
    address: Joi.string().allow('', null),
    country: Joi.string().allow('', null),
    state: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    zipcode: Joi.string().allow('', null),
    Linkedin: Joi.string().allow('', null),
    Twitter: Joi.string().allow('', null),
    whatsapp: Joi.string().allow('', null),
    facebook: Joi.string().allow('', null),
    yahoo: Joi.string().allow('', null),
    empid: Joi.string().allow('', null),
  });
  const { error, value: payload } = schema.validate(req.body);
  if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
  try {
    console.log("addEmployeeService payload=====", req.body);
    const result = await addEmployeeService(req);
    console.log("addEmployeeService result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.update, ServerStatusCode.SUCCESS_CODE, false, '');
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.SUCCESS_CODE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true, '');
  }
}
// get employee list
const getMyEmployee = async (req, res) => {
  try {
  const schema = Joi.object({
    limit: Joi.number().required(),
    offSet: Joi.number().required(),
    // user_group: Joi.string().allow('', null),
    emailstatus: Joi.string().allow('', null),
    userstatus: Joi.string().allow('', null),
    // loginaccessgranted: Joi.string().allow('', null),
    // reqtype: Joi.string().allow('', null),
    fromdate: Joi.string().allow('', null),
    enddate: Joi.string().allow('', null),
    search: Joi.string().allow('', null),
    // isFav: Joi.boolean().allow('', null),

  });
  const { error, value: payload } = schema.validate(req.body);
  if (error) { throw Error(Boom.badRequest(`${error.details[0].message}`.replace(/'/g, ''))) }
 
    console.log("getMyEmployee payload=====", req.body);
    const result = await getMyEmployeeService(req);
    console.log("getMyEmployee result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiErrorRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}
// get profile
const getEmployeeById = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required()
    });
    const { error, value: payload } = schema.validate(req.query);
    if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
    console.log("getMyEmployee payload=====", req.query);
    const result = await service.getEmployeeById(req);
    console.log("getMyEmployee result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

const updateEmployeeInfo = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      office_email: Joi.string().required(),
      p_pcode: Joi.string().allow('',null),
      officialphone1: Joi.string().allow('',null),
      officialphone1extention: Joi.string().allow('',null),
      s_pcode: Joi.string().allow('',null),
      officialphone2: Joi.string().allow('',null),
      officialphone2extention: Joi.string().allow('',null),
      jobCatagiory: Joi.string().allow('',null),
      summary: Joi.string().allow('',null),
      status: Joi.string().allow('',null),

    });
    const { error, value: payload } = schema.validate(req.body);
    if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
    console.log("updateEmployeeInfo payload=====", req.body);
    const result = await service.updateEmployeeInfo(req);
    console.log("updateEmployeeInfo result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.update, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

const updateSocialInfo = async (req, res) => {
  try {

    const schema = Joi.object({
      id: Joi.number().required(),
      facebookurl: Joi.string().allow('',null),
      linkedinurl: Joi.string().allow('',null),
      skype: Joi.string().allow('',null),
      twitterurl: Joi.string().allow('',null),
      whatsappcode: Joi.string().allow('',null),
      whattsupno: Joi.string().allow('',null),
      yahooid: Joi.string().allow('',null),    

    });
    const { error, value: payload } = schema.validate(req.body);
    if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
    console.log("updateSocialInfo payload=====", req.body);
    const result = await service.updateSocialInfo(req);
    console.log("updateSocialInfo result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.update, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    console.log(error);
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

const updatePersonalInfo = async (req, res) => {
  try {

    const schema = Joi.object({
      id: Joi.number().required(),
      firstname: Joi.string().allow('',null),
      lastname: Joi.string().allow('',null),
      designation: Joi.string().allow('',null),
      gender: Joi.string().allow('',null),
      email: Joi.string().allow('',null),
      phonecode: Joi.string().allow('',null),
      phone: Joi.string().allow('',null),    
      dob: Joi.string().allow('',null),    
      address: Joi.string().allow('',null),    
      city: Joi.string().allow('',null),    
      stateofresidence: Joi.string().allow('',null),    
      countryofresidence: Joi.string().allow('',null),    
      ZipCode: Joi.string().allow('',null),    

    });
    const { error, value: payload } = schema.validate(req.body);
    if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
    console.log("updatePersonalInfo payload=====", req.body);
    const result = await service.updatePersonalInfo(req);
    console.log("updatePersonalInfo result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.update, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    console.log(error);
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}


module.exports = {
  addEmployeeController,
  getMyEmployee,
  getEmployeeById,
  updateEmployeeInfo,
  updateSocialInfo,
  updatePersonalInfo
};

