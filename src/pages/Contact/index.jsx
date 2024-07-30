import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import './styles.css';

let user_name;
let user_email;

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_nxiind2', 'template_3slyeqh', form.current, {
        publicKey: 'zziYgU1TWsjenhrQv',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
    {/* <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md' ref={form} onSubmit={sendEmail}>
        <label className='block text-pink-700'>Name</label>
        <input type="text" name="user_name" />
        <label className='block text-pink-700'>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
        </form>
    </div> */}

    <div className="container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sub-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="heading text-2xl font-semibold mb-6 text-center">Comments</h2>
        <form className='form' ref={form} onSubmit={sendEmail}>
          <div className="comp">
            <label htmlFor="username" className="label">Username:</label>
            <input
              type="user_name"
              id="user_name"
              name='user_name'
              value={user_name}
              //onChange={(e) => setEmail(e.target.value)}
              required
              className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="comp">
            <label htmlFor="useremail" className="label">Email:</label>
            <input
              type="user_email"
              id="user_email"
              name='user_email'
              value={user_email}
              //onChange={(e) => setPassword(e.target.value)}
              required
              className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="comp">
            <label className='label'>Message:</label>
            <textarea className='input' name="message" />
          </div>
          <button
            type="submit"
            className="btn"
            value='send'
          >
            Send
          </button>
          <button
            type="submit"
            className="btn"
            value='back'
          >
            <Link className='back-btn' to='/'>
                <span>Back</span>
            </Link>
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;