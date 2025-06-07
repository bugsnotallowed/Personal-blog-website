import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles.css';
import '../AboutPage.css';

let user_name;
let user_email;

const Contact = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();

      emailjs
        .sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        })
        .then(
          () => {
            console.log('SUCCESS!');
            e.target.reset();
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
          setIsSubmitted(true),
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

        {/* <div className="container flex items-center justify-center min-h-screen bg-gray-100">
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
    </div> */}

        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📚</span>
                </div>
                <span className="text-xl font-bold text-blue-600">Adarsh Writes</span>
              </div>
              <nav className="flex items-center space-x-8">
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                <a href="/contact" className="text-blue-600 font-medium">Contact</a>
              
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info Section */}
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
                <p className="text-xl opacity-90 mb-12 leading-relaxed">
                  Have a question about web development, want to collaborate on a project,
                  or just want to say hello? I'd love to hear from you!
                </p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="opacity-80">adarsh.signin173@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="opacity-80">Mumbai, India</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12">
                  <h3 className="font-semibold mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Me a Message</h2>
                    <form onSubmit={sendEmail}>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="user_name"
                            name='user_name'
                            value={user_name}
                            //onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="user_email"
                            name='user_email'
                            value = {user_email}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Project Collaboration"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" name="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                          placeholder="Tell me about your project or question..."
                        />
                      </div>

                      <button
                        type="submit"
                        value='send'
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:ring-4 focus:ring-purple-200"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <div className="animate-pulse text-sm text-gray-500">
                      Form will reset automatically...
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">What's your typical response time?</h3>
                    <p className="text-gray-600">I usually respond within 24 hours, often sooner during weekdays.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Do you offer consulting services?</h3>
                    <p className="text-gray-600">Yes! I provide web development consulting and mentoring services.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Can you help with my project?</h3>
                    <p className="text-gray-600">I'd love to hear about it! Send me details and we can discuss how I can help.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Do you write guest posts?</h3>
                    <p className="text-gray-600">Absolutely! I'm always interested in sharing knowledge on other platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  };
export default Contact;