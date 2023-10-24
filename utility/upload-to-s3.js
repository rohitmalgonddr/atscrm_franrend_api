const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: 'AKIAQTQPWKEEY2GIPLRQ',
    secretAccessKey: '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',
    // region: 'Asia Pacific (Mumbai) ap-south-1'
});
exports.uploadStreamToS3 = async (fileInput, key, bucket) => {

    bucket = 'atscrm';
    try {
        let params = {
            Bucket: bucket,
            Key: 'test/'+key,
            // Key: key,
            Body: fileInput
        };
        await new AWS.S3().putObject(params).promise();
        console.log("Successfully uploaded data to bucket");
        return true;

    } catch (e) {
        console.log("Error uploading data: ", e);
        return false;
    }
}

