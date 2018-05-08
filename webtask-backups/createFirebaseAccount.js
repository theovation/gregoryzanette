// after firebase user is created, use this endpoint to store that
// user to the queryable realtime database under /users as well.
// this will likely end up as a full client-side implementation
// but would like to save it once on the cloud for future use
var firebase = require("firebase");

module.exports = function(context, req, res) {
  function createUser(respondWith, data) {
    if(data.number && data.stripeToken && data.email && data.customerId) {
      var app = firebase.initializeApp({
          // TODO  
      });
  
      firebase.database().ref('users/' + userId).set({
          // username: name,
          // email: email,
          // profile_picture : imageUrl
      });
    } else {
      respondWith('invalid POST data');
    }
  }
  
  processPostRequest(context,req,res,createUser);
  // boiler plate used in every POST request  
  function processPostRequest(context,req, res, cb) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if( req.method === 'POST' ){
        var jsonString = '';
        req.on('data', function (data) {
            jsonString += data;
        });
        req.on('end', function () {
          try {
            var data = JSON.parse(jsonString);
            cb(res.end, data);
          } catch(e) {
            res.send('invalid POST data sent')
          }
        });
    } else {
        res.end('This endpoint is for POST requests only');
    }
  }
};