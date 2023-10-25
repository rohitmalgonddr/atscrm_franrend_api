
const {
  addEmployeeController,
  getMyEmployee,
  getProfileContoller
} = require('../employer/controller');

const contoller = require('../employer/controller');

async function routes(fastify) {
    fastify.post('/v1/getMyEmployee',getMyEmployee);
    fastify.post('/v1/addEmployee',addEmployeeController);
    fastify.get('/v1/getEmployeeById',contoller.getEmployeeById);
    fastify.put('/v1/updateEmployeeInfo',contoller.updateEmployeeInfo);
    fastify.put('/v1/updateSocialInfo',contoller.updateSocialInfo);
    fastify.put('/v1/updatePersonalInfo',contoller.updatePersonalInfo);

    
  }
module.exports= routes;
