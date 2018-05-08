var AWS = require('aws-sdk');

var uuid = require('uuid');

AWS.config.update({
  accessKeyId: "AKIAICPSGWPMVYKTTH6A",
  secretAccessKey: "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"
});

AWS.config.update({region: 'us-east-1'});

var ddb = new AWS.DynamoDB();
var documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = function(context, cb) {
  var params = {
    TableName: 'anotherTest',
    Item: {
      'uniqueID': {
        'S': uuid.v4()
      },
      'email': { 'S': 'antelo.juan2@gmail.com'} ,
      'walletID' : {S: 'alphaNumericStringRepresentWalletID'},
      'coinTicker' : {S: 'XRBTS'}
    }
  };
/*
  documentClient.scan({
    TableName : 'userToWalletID',
    Limit : 50
  }, function(err, data) {
      if (err) { console.log(err); return; }

      for (var ii in data.Items) {
          ii = data.Items[ii];
          console.log(ii);
          cb(null, { items: ii });
      }
  });
*/
  
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
    cb(null, { hello: context.query.name || 'Anonymous' });
  });
};
