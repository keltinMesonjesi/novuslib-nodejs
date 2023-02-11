const nodemailer = require('nodemailer');
const pug = require('pug');
const { debug } = require('../../config/app');
const mailConfig = require('../../config/mail');
const { logging } = require('../../config/logging');

/**
 * Connect to mail server
 */
const transporter = nodemailer.createTransport(mailConfig.mailers.smtp);

if (debug === 'true') {
  transporter
    .verify()
    .then(() => logging.info('Connected to email server'))
    .catch(() => logging.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Configure function for each mailer, add send function here for new mailers
 * @type {{smtp: (function(*, *, *, {}=): Promise<any>)}}
 */
const mailerFunctions = {
  smtp: (to, subject, template, variables = {}) =>
    transporter
      .sendMail({
        from: `${mailConfig.from.name} <${mailConfig.from.address}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html: pug.renderFile(`${mailConfig.templateFolderPath}/${template}.email.pug`, variables), // html body
      })
      .catch((err) => logging.error(err)),
};

/**
 * General function for sending email
 * @param to String
 * @param subject String
 * @param template String
 * @param variables Object
 */
const sendEmail = (to, subject, template, variables = {}) => {
  mailerFunctions[mailConfig.default](to, subject, template, variables);
};

/**
 * Usage example
 */
/*sendEmail(
  'test@test.com',
  'My real test',
  'example',
  {
    name: 'Test'
  }
);*/

module.exports = {
  sendEmail,
};
