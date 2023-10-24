const Joi = require('joi');
const { apiErrorRes, apiSuccessRes } = require('../../utility/commonResponse');
const { EMAIL_PLAN_TYPE,
  ServerStatusCode,
  CommonErrorMessage,
  CURD_MESSAGE
} = require('../../utility/constant');


const service = require('./service');
// get profile
const getCountryList = async (req, res) => {
  try {
 
    console.log("getCountryList payload=====", req.query);
    const result = await service.getCountryList(req);
    console.log("getCountryList result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}
const getStateList = async (req, res) => {
  try {
 
    console.log("getStateList payload=====", req.query);
    const result = await service.getStateList(req);
    console.log("getStateList result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

const getCityList = async (req, res) => {
  try {
 
    console.log("getCityList payload=====", req.query);
    const result = await service.getCityList(req);
    console.log("getCityList result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

const getPhoneCode = async (req, res) => {
  try {
 
    console.log("getPhoneCode payload=====", req.query);
    const result = await service.getPhoneCode(req);
    console.log("getPhoneCode result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}


const getVendorCategory = async (req, res) => {
  try {
 
    console.log("getVendorCategory payload=====", req.query);
    const result = await service.getVendorCategory(req);
    console.log("getVendorCategory result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}
const getUserStatus = async (req, res) => {
  try {
 
    console.log("getUserStatus payload=====", req.query);
    const result = await service.getUserStatus(req);
    console.log("getUserStatus result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

const getGenderList = async (req, res) => {
  try {
 
    console.log("getGenderList payload=====", req.query);
    const result = await service.getGenderList(req);
    console.log("getGenderList result=====", result);
    if (!result.IsError) {
      apiSuccessRes(res, CURD_MESSAGE.fetch, ServerStatusCode.SUCCESS_CODE, false, result.response);
    } else {
      apiSuccessRes(res, result.errorMsg, ServerStatusCode.UNPROCESSABLE, true, '');
    }
  } catch (error) {
    console.log(error);
    apiErrorRes(res, CommonErrorMessage.SomethingError, ServerStatusCode.UNPROCESSABLE, true,'');
  }
}

module.exports = {
    getCountryList,
    getStateList,
    getCityList,
    getPhoneCode,
    getVendorCategory,
    getUserStatus,
    getGenderList
  
};

