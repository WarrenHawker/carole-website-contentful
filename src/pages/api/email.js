import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const msg = {
    to: 'warren.hawker@freedom-leisure.co.uk',
    from: 'hawker.warren@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  try {
    await sendgrid.send(msg);
    console.log('Email sent');
  } catch (error) {
    return res.send(200).json({ error: error.message });
  }
};

export default sendEmail;
