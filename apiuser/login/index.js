
function routes(fastify)  {
    console.log('hiiiiiiiiiiiiiiiii');
fastify.register(require('./hotlist'),{prefix:'/api/user/v1/outside'});
}

module.exports=routes;
