import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmails = async (req, res) => {
  const { name, email, message } = req.body;
  const msgToCustomer = {
    to: email,
    from: process.env.ADMIN_FROM_EMAIL,
    subject: 'Thank you for your inquiry',

    text: `Hi ${name},  
    Thank you for your inquiry. We will respond as quickly as possible. 
    Your inquiry was:
    name: ${name}, email: ${email}, message: ${message}
    This is an automated response from an unmonitored account. 
    Please do not reply directly to this email.`,

    html: `Hi ${name}, <br/> 
    Thank you for your inquiry. We will respond as quickly as possible. <br/><br/>
    Your inquiry was: <br/>
    name: ${name},<br/> email: ${email}, <br/> message: ${message} <br/><br/>
    <strong>This is an automated response from an unmonitored account. 
    Please do not reply directly to this email.</strong>`,
  };

  const msgToAdmin = {
    to: process.env.ADMIN_TO_EMAIL,
    from: process.env.ADMIN_FROM_EMAIL,
    subject: 'New website inquiry',
    text: `name: ${name}, email: ${email}, message: ${message}`,
    html: `name: ${name},<br/> email: ${email}, <br/> message: ${message}`,
  };
  try {
    await sendgrid.send(msgToCustomer);
    await sendgrid.send(msgToAdmin);
  } catch (error) {
    return res.send(200).json({ error: error.message });
  }
};

export default sendEmails;
