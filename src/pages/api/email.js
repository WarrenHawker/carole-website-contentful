import sendgrid from '@sendgrid/mail';
import isEmail from 'validator/lib/isEmail';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmails = async (req, res) => {
  const { name, email, message } = req.body;
  const emptyFields = [];
  if (!name) {
    emptyFields.push('name');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!message) {
    emptyFields.push('message');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ emptyFields, error: 'Please fill in all fields' });
  }
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ emptyFields, error: 'Please enter a valid email' });
  }

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
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ message: 'email sent' });
};

export default sendEmails;
