const app = require("express")();

function processSingleEmail() {
  
}

function processMultipleEmails() {
  
}

module.exports = function(context, req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    switch(req.method ){
      case 'GET':
        res.end('this is a POST endpoint only');
        break;
      case 'POST':
        var jsonString = '';
        req.on('data', function (data) {
            jsonString += data;
        });
        req.on('end', function () {
            var t = JSON.parse(jsonString);
            console.log(t.world);
        });
        res.end('blah')
        break;
    }
    function processStripeToken() { }
};