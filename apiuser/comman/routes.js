
  const contoller = require('./controller');
  
  async function routes(fastify) {
  
      fastify.get('/v1/getCountryList',contoller.getCountryList);
      fastify.get('/v1/getStateList',contoller.getStateList);
      fastify.get('/v1/getCityList',contoller.getCityList);
      fastify.get('/v1/getPhoneCode',contoller.getPhoneCode);
      fastify.get('/v1/getVendorCategory',contoller.getVendorCategory);
      fastify.get('/v1/getUserStatus',contoller.getUserStatus);
      fastify.get('/v1/getGenderList',contoller.getGenderList);

      
      
    }
  module.exports= routes;
  