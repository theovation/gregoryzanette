var stripe = require('stripe@4.14.0');

module.exports = function(context, cb) {
  // cb(null, { hello: context.data.name || 'Anonymous' });
  
  // ℹ| You seectx.body.name, ctx.body.phone, ctx.body.address, it’s the way you access to POST variables in our webtask function.
  // new Stripe order by reaching it via POST, and passing it some POST variable like the customer name, email, address, and some informations about the product (SKU reference ID, quantity).
  // call stripe API new order
  stripe(context.secrets.stripe_private_api_key).orders.create({
    currency: 'usd',
    email: context.body.email,
    metadata: {
      phone: context.body.phone
    },
    items: [
    {
      type: '',
      parent: '',
      quantity: ''
    }  
    ]
  }, function(err, order) {
      cb(null, {order: order || err  });
  })
  
};
