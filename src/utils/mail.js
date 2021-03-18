const { confirmationEmailURL } = require('../constants/base');

function getConfirmationMailOptions({ to, activeKey }) {
  return {
    to,
    subject: 'Please confirm your Email account',
    html: `<h1>Instagram Khuong</h1><br/>
      <p>Click the link to confirm your email and active your Instagram account</p>
      <a href="${confirmationEmailURL}/${activeKey}">Confirm email</a><br/>
      <p>Thank you</p>
    `,
  };
}
module.exports = {
  getConfirmationMailOptions,
};
