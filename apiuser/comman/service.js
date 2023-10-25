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


// get employer profile
const getCountryList = async (req, res) => {
  try {

    const data= await DB.country_list.findAll({
        where:{status:'APPROVED'}
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
const getStateList = async (req, res) => {
  try {

    const data= await DB.state_list.findAll({
      where:{status:'APPROVED' ,country_id: req.query.country_id }
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

const getCityList = async (req, res) => {
  try {

    const data= await DB.city_list.findAll({
      where:{status:'APPROVED' ,state_id: req.query.state_id }
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


const getPhoneCode = async (req, res) => {
  try {

    const data= await DB.countrycode.findAll();

    return {
      IsError: false,
      msg: "",
      response:data
    }
    
  } catch (DBException) {
    return Boom.badRequest(DBException.message);
  }

}

const getVendorCategory = async (req, res) => {
  try {

    const data= await DB.user_group_list.findAll({
      where:{status:'APPROVED'}
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
const getUserStatus = async (req, res) => {
  try {
    const data= await DB.manage_userstatus_list.findAll({
      where:{status:'APPROVED'}
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

const getGenderList = async (req, res) => {
  try {
    console.log('====================================');
    const data= await DB.gender_list.findAll({
      where:{status:'APPROVED'}
  });
  // console.log(data,'222');
    return {
      IsError: false,
      msg: "",
      response:data
    }
    
  } catch (DBException) {
    console.log(DBException);
    return Boom.badRequest(DBException.message);
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
