const Joi = require('joi');
const { apiErrorRes, apiSuccessRes } = require('../../../utility/commonResponse');
const { EMAIL_PLAN_TYPE,
  ServerStatusCode,
  CommonErrorMessage,
  CURD_MESSAGE
} = require('../../../utility/constant');



const service = require('./service');
const Boom = require('@hapi/boom');


const getConsultantFilterList = async (req, res) => {
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
    console.log("getConsultantFilterList payload=====", req.body);
    const result = await service.getConsultantFilterList(req);
    console.log("getConsultantFilterList result=====", result);
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
    getConsultantFilterList
};

