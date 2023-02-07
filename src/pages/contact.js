const sendEmail = async () => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'warren.hawker@freedom-leisure.co.uk',
    from: 'hawker.warren@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

const Contact = () => {
  return (
    <section className='contact-page'>
      <article>
        <h1 className='page-title'>Contact me</h1>
        <h2>To purchase or commission artwork</h2>
        <p>
          Please fill out the contact form and I will get back to you as soon as
          I can. Prices for already completed work are available on request.
        </p>
      </article>

      <form className='contact-form'>
        <label htmlFor='name'>
          Name <span className='required'>*</span>
        </label>
        <input name='name' type='text' required></input>
        <label htmlFor='email'>
          Email <span className='required'>*</span>
        </label>
        <input name='email' type='email' required></input>
        <label htmlFor='message'>
          Message <span className='required'>*</span>
        </label>
        <textarea></textarea>
        <button
          className='btn'
          onClick={(e) => {
            e.preventDefault();
            sendEmail();
          }}>
          Send message
        </button>
      </form>
    </section>
  );
};

export default Contact;
