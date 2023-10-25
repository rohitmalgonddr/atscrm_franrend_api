// // Require the framework and instantiate it
const fastify = require('fastify')({ logger: true, bodyLimit: 12485760 })
fastify.register(require('@fastify/formbody'));
const fastifyCors = require('@fastify/cors');
require('dotenv').config();
const os = require('os');
const cluster = require('cluster')

// user routes
fastify.register(require('./apiuser/login/hotlist'), { prefix: '/api/user' });
fastify.register(require('./apiuser/login/login'), { prefix: '/api/user/v1/outside' });
fastify.register(require('./apiuser/employer/routes'), { prefix: '/api/user/employer' });
fastify.register(require('./apiuser/comman/routes'), { prefix: '/api/user/employer' });
fastify.register(require('./apiuser/employer/consultant/routes'), { prefix: '/api/user/employer' });
fastify.register(fastifyCors, {
  origin: '*',
});
const start = async () => {
  try {
    if (cluster.isPrimary) {
      const numCPUs = os.cpus().length;
      console.log(`Primary ${process.pid} is running`);
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      await fastify.listen({ port: 3010 }, () => {
        console.log(`Worker ${process.pid} started`);
        if (cluster.worker.id === 1) {
          //  Scheduler.run();
        }
      })

    }
  } catch (err) {
    // console.log(err);
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
