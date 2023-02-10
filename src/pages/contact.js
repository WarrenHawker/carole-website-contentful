import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSent, setFormSent] = useState(false);

  console.log(formSent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/email', {
      body: JSON.stringify({
        name,
        email,
        message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (!response.ok) {
      const { error, emptyFields } = await response.json();
      setError(error);
      setEmptyFields(emptyFields);
      return;
    }
    setError(null);
    setEmptyFields([]);
    setFormSent(true);
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
        {formSent ? (
          <h3>
            Thank you for submitting the form. We will get back to you as soon
            as we can.
          </h3>
        ) : (
          <>
            <label htmlFor='name'>
              Name <span className='required'>*</span>
            </label>
            <input
              className={emptyFields.includes('name') ? 'invalid' : ''}
              name='name'
              type='text'
              value={name}
              onChange={(e) => {
                setEmptyFields((prevFields) =>
                  prevFields.filter((i) => i != 'name')
                );
                setName(e.target.value);
              }}
              required></input>
            <label htmlFor='email'>
              Email <span className='required'>*</span>
            </label>
            <input
              className={emptyFields.includes('email') ? 'invalid' : ''}
              name='email'
              type='email'
              value={email}
              onChange={(e) => {
                setEmptyFields((prevFields) =>
                  prevFields.filter((i) => i != 'email')
                );
                setEmail(e.target.value);
              }}
              required></input>
            <label htmlFor='message'>
              Message <span className='required'>*</span>
            </label>
            <textarea
              className={emptyFields.includes('message') ? 'invalid' : ''}
              value={message}
              onChange={(e) => {
                setEmptyFields((prevFields) =>
                  prevFields.filter((i) => i != 'message')
                );
                setMessage(e.target.value);
              }}></textarea>
            {error ? <p className='error'>{error}</p> : null}
            <button
              className='btn'
              onClick={(e) => {
                handleSubmit(e);
              }}>
              Send message
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default Contact;
