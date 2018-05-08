
module.exports = function(context, cb) {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';
  var officeID = "100000";
  var agentID = 'CN219484';
  MongoClient.connect(url, function(err, client) { 
      var brokerageName;
      var listingAgentName;
      const db = client.db('listings')
      db.collection("offices").findOne({'officeId': officeID}, function(err, result) {
        brokerageName = result.officeName;
        db.collection("agents").findOne({'id': agentID}, function(err, result) {
          listingAgentName = result.fullName;
          
          var ret = {
            name: listingAgentName,
            office: brokerageName
          };
          
          cb(null, { status: ret });
          db.close();
        })
      });
  });
};