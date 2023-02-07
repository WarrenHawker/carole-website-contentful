const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/email', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const { error } = await response.json();
    if (error) {
      console.log(error);
      return;
    }
  };
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
            handleSubmit(e);
          }}>
          Send message
        </button>
      </form>
    </section>
  );
};

export default Contact;
