const Joi = require('joi');
const Boom = require('@hapi/boom');
const DB = require('../../storage/model');
const { QueryTypes } = require('sequelize');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

// const { Op } = require("sequelize");
// const auth = require('../utility/auth');
// const {uploadStreamToS3} = require('../utility/upload-to-s3');
// const {getSignedUrl} = require('../utility/getSignedUrl');

const bucket='';
const login = async(req,res)=>{
    const schema = Joi.object({
        userType: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error, value: payload } = schema.validate(req.body);
      if (error) { return Boom.badRequest(`${error.details[0].message}`.replace(/'/g, '')); }
    try {

        
         if(payload.userType ==='Consultants') {
            const data = await DB.consultant.findOne({
                attributes: ['id'],
                where: { primary_mail: payload.userName,
                    password:md5(payload.password)
                }
              });
              if(!data) {
                return false;
              }

              let dbEmail= payload.userName;
              let dbUserId=data.id;
              let dbusertype='consultant';
              const token = jwt.sign({dbEmail, dbUserId,dbusertype}, 'a55efbb9f5e6bfe5c2c69d9cff9f3f9e66ad4d1f0ef2f6dde36acd53676fd245cad97c3e4a01821c25c2b419fbe25592765a1cde0bca5144af550c66d5d93a17');
              res.cookie('auth', token, { maxAge: 24 * 60 * 60 * 1000 });
              res.send({
                    token,
                    massage:'successfully login'
                });
 

         }
  
         if(payload.userType ==='Employers') {
            const data = await DB.employee.findOne({
                attributes: ['empid','profiletype'],
                where: { office_email: payload.userName,
                    password:md5(payload.password)
                }
              });
              console.log("=======",data);
              if(!data) {
                return false;
              }

              let dbEmail= payload.userName;
              let dbUserId=data.empid;
              let dbusertype=data.profiletype;
              console.log(dbusertype);
              const token = jwt.sign({dbEmail, dbUserId,dbusertype}, 'a55efbb9f5e6bfe5c2c69d9cff9f3f9e66ad4d1f0ef2f6dde36acd53676fd245cad97c3e4a01821c25c2b419fbe25592765a1cde0bca5144af550c66d5d93a17');
              res.send({
                    token,
                    massage:'successfully login'
                });
 

         }

    } catch (DBException) {
      console.log('error =>', DBException);
      return Boom.badRequest(DBException.message);
    }

 
  }
  

async function routes(fastify) {
    fastify.post('/user/login',login);
  }
module.exports= routes;