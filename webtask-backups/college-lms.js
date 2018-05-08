var mongoose = require('mongoose@4.1.6');

module.exports = function(context, cb) {
//  mongoose.connect('mongodb://adminuser:secretpassword@ds239968.mlab.com:39968/college-lms', { useMongoClient: true });
  
//  mongodb://<dbuser>:<dbpassword>@ds241019.mlab.com:41019/listings
  
  mongoose.connect('mongodb://jantelo:Falcons1!@ds241019.mlab.com:41019/listings', { useMongoClient: true });
  
  var kitty = new Cat({ name: 'Zildjian' });
  kitty.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('meow');
  }
  cb(null, { status: 'success' });
});

}
