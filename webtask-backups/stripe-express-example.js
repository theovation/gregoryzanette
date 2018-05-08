// TODO - update users table after connection has been made
const app = require("express")();
const Stripe = require("stripe");//(keySecret);
const qs = require('qs');

module.exports = function(context, req, res) {
    var number = context.query.number;
  
    var keyPublishable = context.secrets.PUBLISHABLE_KEY;
    var keySecret = context.secrets.SECRET_KEY;
    var stripe = new Stripe(keySecret);
    var stripeToken;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    switch(req.method ){
      case 'GET':
        res.end('this is a POST endpoint only');
        break;
      case 'POST':
        req.on('data', function (data) {
            var postData = data.toString();
            var stripeToken = postData.slice(postData.indexOf("=") + 1,postData.indexOf("&"));
            processStripeToken(res, stripeToken, number);
        });
    }

    function processStripeToken(res, stripeToken, number) {
        var amount = 500;
        stripe.customers.create({
          email: 'antelo.juan2@gmail.com',
          source: stripeToken,
          metadata: {
            "number": number
          }
        })
        .then(customer => {
          // same customer id to number via firebase
          stripe.charges.create({
            amount,
            description: "Sample Charge new",
              currency: "usd",
              customer: customer.id
            })})
        .then(charge => { 
          res.end('charge success');
        }).catch(() => {
          res.end('there was an error charging');
        })
    }
};
