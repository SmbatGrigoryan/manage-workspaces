const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');

module.exports =  (
  TRANSPORTER_EMAIL,
  TRANSPORTER_PASSWORD,
  to,
  subject,
  text,
  html

) => {

    let transporter = nodemailer.createTransport({

        service: 'gmail',
        // host: 'smtp.fluxtechs.com',
        auth: {
            user: TRANSPORTER_EMAIL,
            pass: TRANSPORTER_PASSWORD
        }
    });

  let mailOptions = {
    from: TRANSPORTER_EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html
  };

    return transporter.sendMail(mailOptions);
};
