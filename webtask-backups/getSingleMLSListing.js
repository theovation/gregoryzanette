module.exports = function(context, cb) {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';
  const dbName = 'listings';

  MongoClient.connect(url, function(err, client) {
    const db = client.db('listings')
    
    db.collection("listings").findOne({'LIST_NO': context.query.mlsid}, function(err, result) {
      cb(null, { status: result });
      db.close();
    });
  })
};
