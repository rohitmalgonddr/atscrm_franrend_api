const AWS = require('aws-sdk');
const config = require('./../config/config');
const s3= new AWS.S3({
    accessKeyId: config.S3.accessKeyId,
    secretAccessKey: config.S3.secretAccessKey,
    region:  config.S3.region,
    // signatureVersion: 'v4'

});
exports.getSignedUrl= async ( key , bucket) => {

    bucket=config.S3.S3_BUCKET;
    try {
       const signedUrlExpireSeconds = 60 * 5;
        let params = {
            Bucket: bucket,
            Key: 'test/'+key,
            // Key:key,

            Expires: signedUrlExpireSeconds
        };
        url = await s3.getSignedUrlPromise('getObject', params);
        return url;
        
    } catch (e) {
        console.log("Error uploading data: ", e);
        return false ;
    }
}

