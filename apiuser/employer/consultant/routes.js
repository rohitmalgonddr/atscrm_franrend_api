


  
  const contoller = require('./controller');
  
  async function routes(fastify) {
      fastify.get('/v1/getConsultantFilterList',contoller.getConsultantFilterList);
    
    }
  module.exports= routes;
  

