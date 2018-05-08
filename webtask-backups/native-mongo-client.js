
module.exports = function(context, cb) {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings';
  const dbName = 'listings';

  MongoClient.connect(url, function(err, client) {
  const db = client.db('listings')
  
  db.collection("listings").update(
   { mlsid: "Andy" },
   {
      name: "Andy",
      rating: 1,
      score: 1
   },
   { upsert: true }
)
  
/*
  db.collection("listings").findOne({}, function(err, result) {
    console.log('in find one')
    console.log(result);
    cb(null, { status: result });
    db.close();
  });

  db.collection("listings").find({}).toArray( function(err, result) {
    console.log(result);
    cb(null, { status: result });
    db.close();
  });
*/
 });
};


