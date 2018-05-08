'use strict';
var mail = require('nodemailer@2.5.0');

module.exports = function(context, cb) {

var subjectHeader = "empty";
var bodyMessage = "empty"

if(context.data.msg === "mlserror") {
  subjectHeader = "MLS file download failed";
  bodyMessage = "Needs diagnosis";
}

if(context.data.msg === "success") {
  subjectHeader = "Listings Updated";
  bodyMessage = "Successfully";
}

var transporter = mail.createTransport({
  service: 'Gmail',
  auth: {
    user: 'antelo.juan@gmail.com',
    pass: 'juantelo'
  }});

  var mailOptions = {
      from: '"Juan Antelo" <antelo.juan@gmail.com>',
      to: 'antelo.juan@gmail.com',
      subject: subjectHeader,
      text: bodyMessage
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
  });
  cb(null, { status : 'success' });
};
