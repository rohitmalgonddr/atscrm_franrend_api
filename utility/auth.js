
       var jwt = require('jsonwebtoken');

     async  function auth(req ) {
        let decoded = jwt.decode(req.headers.authorization);
        let dbEmail=decoded.dbEmail;
        let dbUserId=decoded.dbUserId;
        let dbusertype=decoded.dbusertype;
         return {dbEmail,dbUserId,dbusertype}
       }
    module.exports = auth;