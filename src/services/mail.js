const nodeMailer = require('nodemailer');
const config = require('config');
const { getConfirmationMailOptions } = require('../utils/mail');
const smtpTransporter = nodeMailer.createTransport({
  service: 'Gmail',
  auth: config.get('MAIL_OPTIONS'),
});

async function sendMail({ to, activeCode }) {
  return smtpTransporter.sendMail(
    getConfirmationMailOptions({ to, activeCode })
  );
}

module.exports = {
  sendMail,
};
