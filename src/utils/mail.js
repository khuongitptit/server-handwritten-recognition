function getConfirmationMailOptions({ to, activeCode }) {
  return {
    to,
    subject: 'Instagram Khuong - Email verification',
    html: `<h1>Instagram Khuong</h1><br/>
      <p>This is your verification code</p>
      <h5>${activeCode}</h5>
      <p>Thank you</p>
    `,
  };
}
module.exports = {
  getConfirmationMailOptions,
};
