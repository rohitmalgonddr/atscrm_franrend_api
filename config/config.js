const config = {
    development:{
        DB:{           
            host:'localhost',
            database:'atscrm_new',
            user:'root',
            password:'',
        },
        ALLOW_ORIGIN:'*',
        S3:{
            accessKeyId: process.env.S3_ACCESSKEYID,
            secretAccessKey:process.env.S3_SECRETACCESSKEY,
            region:process.env.S3_REGION,
            S3_BUCKET:process.env.S3_BUCKET

        },
        EXCEL_PARSING_URL:'http://localhost:3001',
        EMAIL_URL:'https://api.goinfinito.com/unified/v2/send',
        EMAIL_TOKEN:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJbmZpbml0byIsImlhdCI6MTY4MTEyNTQyNSwic3ViIjoiZDJpbmZvZ2p2c2o0dm1iczV1NWMzeWp4In0.cv9zqRQJ1x9x48hxAT6uZclaUOAVxanwEnXfyeCnzdM',
        EMAIL_WEBHOOK: "http://13.235.51.144/api/v1/admin/mailbox/webhook",
        EMAIL_FROM:'no-reply@d2inf.infinito-demo.com',
        APP_URL:'http://localhost:9000'

    },  
    production:{
        DB:{
            host:process.env.DB_HOST,
            database:process.env.DB_DATABASE,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,        
        },
        ALLOW_ORIGIN:process.env.ALLOW_ORIGIN,
        S3:{
            accessKeyId: process.env.S3_ACCESSKEYID,
            secretAccessKey:process.env.S3_SECRETACCESSKEY,
            region:process.env.S3_REGION,
            S3_BUCKET:process.env.S3_BUCKET

        },
        EXCEL_PARSING_URL:'http://localhost:3001',
        EMAIL_URL:'https://api.goinfinito.com/unified/v2/send',
        EMAIL_TOKEN:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJbmZpbml0byIsImlhdCI6MTY4MTEyNTQyNSwic3ViIjoiZDJpbmZvZ2p2c2o0dm1iczV1NWMzeWp4In0.cv9zqRQJ1x9x48hxAT6uZclaUOAVxanwEnXfyeCnzdM',
        EMAIL_WEBHOOK: "http://13.235.51.144/api/v1/admin/mailbox/webhook",
        EMAIL_FROM:'noreply@d2inf.infinito-demo.com'
    }
}
module.exports = config.development;
