const Boom = require('@hapi/boom');
const DB = require('../storage/model');
const axios = require('axios');

async function verifyEmailAPI(email) {
    const config = {
      method: 'GET',
      url: 'https://api.millionverifier.com/api/v3/?api=nVRiLGBV7abROz7Ky6I6o8eWz&email=' + email + '&timeout=10',
      headers: {}
    };
    return await axios(config)
      .then(async function (response) {
        let result = response.data;
        let status = result.subresult;
        if (status == 'ok') {
          status = 'valid';
        } else if (status == 'invalid_syntax') {
          status = 'error';
        } else  if (status == 'invalid') {
          status = 'invalid';
        } else {
          status = 'bounce';
        }
       const data = await DB.useremails.findOne({
            where:{
                email:email
            }
        });
        if(data) {
           await DB.useremails.update(
                { status: status,
                    isvarified: '1'
                },
                { where: { email:email } }
              )
        } else {
            await DB.useremails.create({ status: status,isvarified: '1',email:email})
        }     
        return true;
      })
      .catch(function (error) {
        return error;
        console.log(error);
      });
  }

  module.exports={verifyEmailAPI}