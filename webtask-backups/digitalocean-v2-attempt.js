
var awssign = require("aws-sign");
var awssign2 = require("aws-sign2");
var request = require("request")
var req = require('request');
var fs = require('fs');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

module.exports = function(context, cb) {
  
var s3bucket = new AWS.S3({params: {Bucket: 'bostonrentals'}});

uploadFileOnS3('test3.txt', 'hi world');

function uploadFileOnS3(fileName, fileData){
    var params = {
      Key: fileName,
      Body: fileData,
      Headers:{
        'content-type': 'text/plain'
      }
    };
    s3bucket.upload(params, function (err, res) {               
        if(err)
            console.log("Error in uploading file on s3 due to "+ err)
        else    
            console.log("File successfully uploaded.")
    });
}
  
 /* 
  var s3 = new AWS.S3({signatureVersion: 'v4'});
  var params = {Bucket: 'bostonrentals', Key: 'table.jpg'};
  var url = s3.getSignedUrl('putObject', params);
  req({
    method: "GET",
    url: 'https://s3.amazonaws.com/bostonrentals/table.jpg',
    headers: {
    }
  }, function(err, res, body){
    console.log(res);
  });
  */
  cb(null, { hello: context.query.name || 'Anonymous' });
};

























