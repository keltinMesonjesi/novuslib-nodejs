/*
|--------------------------------------------------------------------------
| Email Configurations
|--------------------------------------------------------------------------
|
*/

const { envVars } = require('./app');
const path = require('path');

module.exports = {
  /*
    |--------------------------------------------------------------------------
    | Default Mailer
    |--------------------------------------------------------------------------
    |
    | This option controls the default mailer that is used to send any email
    | messages sent by your application. Alternative mailers may be setup
    | and used as needed; however, this mailer will be used by default.
    |
    */

  default: envVars.MAIL_MAILER,

  /*
    |--------------------------------------------------------------------------
    | Mailer Configurations
    |--------------------------------------------------------------------------
    |
    | Here you may configure all the mailers used by your application plus
    | their respective settings. SMTP has been configured for
    | you by default and are free to add your own as your application requires.
    |
    | You will specify which one you are using for your mailers below.
    | You are free to add additional mailers as required.
    |
    | When adding a different mailer then the default one also create the corresponding
    | function in "email.provider.js"
    */

  mailers: {
    smtp: {
      host: envVars.MAIL_HOST,
      port: envVars.MAIL_PORT,
      auth: {
        user: envVars.MAIL_USERNAME,
        pass: envVars.MAIL_PASSWORD,
      },
    },
  },

  /*
    |--------------------------------------------------------------------------
    | Global "From" Address
    |--------------------------------------------------------------------------
    |
    | You may wish for all e-mails sent by your application to be sent from
    | the same address. Here, you may specify a name and address that is
    | used globally for all e-mails that are sent by your application.
    |
    */

  from: {
    address: envVars.MAIL_FROM_ADDRESS,
    name: envVars.MAIL_FROM_NAME,
  },

  templateFolderPath: path.join(__dirname, '../resources/views/emails'),
};
