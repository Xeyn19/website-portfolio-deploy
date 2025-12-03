import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import edgar from '/edgar2.jpg';
import emailjs from '@emailjs/browser';


const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Contact = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);

  const getToday = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10); 
  };

  const canSend = (email) => {
    const today = getToday();
    const data = JSON.parse(localStorage.getItem('contact_email_submissions') || '{}');
    const entry = data[email];
    if (entry && entry.date === today) {
      return entry.count < 2;
    }
    return true;
  };

  const incrementSend = (email) => {
    const today = getToday();
    const data = JSON.parse(localStorage.getItem('contact_email_submissions') || '{}');
    const entry = data[email];
    if (entry && entry.date === today) {
      data[email] = { date: today, count: entry.count + 1 };
    } else {
      data[email] = { date: today, count: 1 };
    }
    localStorage.setItem('contact_email_submissions', JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formRef.current.from_email.value.trim().toLowerCase();
    if (!canSend(email)) {
      alert('Oops! This email has reached its daily limit of 2 messages. Please try again tomorrow.');
      return;
    }

    setSending(true);


    const now = new Date();
    const timeString = now.toLocaleString();
    formRef.current.time.value = timeString;

    emailjs.sendForm(
      'service_cs1o819',
      'template_7263nu5',
      formRef.current,
      '9yqMTbCs9TY4obJ-A'
    )
      .then(() => {
        incrementSend(email);
        alert('Thank you for reaching out! Your message has been successfully sent. I will get back to you as soon as possible.');
        formRef.current.reset();
        setSending(false);
      })
      .catch(() => {
        alert('Failed to send message. Please try again.');
        setSending(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center xl:pb-50 max-md:pb-20 max-md:w-full max-md:px-10 max-xl:w-full max-xl:px-20 max-xl:pb-40">


      <motion.h1
        className="block text-center text-4xl font-bold mt-5 mb-20 tracking-wider max-md:mb-10"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        Contact
      </motion.h1>

      <div className="grid grid-cols-2 max-md:grid-cols-1 xl:px-20 gap-20 max-xl:grid-cols-1">


        <motion.div
          className="flex flex-col justify-center items-center space-y-10 px-20 py-20 max-md:px-10 bg-white rounded-xl shadow-md"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src={edgar}
            alt="Edgar Profile"
            className="w-[400px] max-md:w-[200px] self-center rounded-md shadow-lg"
          />
          <p className="text-center text-sm max-md:text-[13px] text-black">
            Are you looking for a skilled Front-End React Developer to bring your ideas to life? I have a strong foundation in HTML, CSS, and JavaScript, combined with expertise in modern tools like Tailwind CSS and React.js. I’m also experienced in using CSS frameworks like Daisy UI and React Material UI to create clean, responsive, and user-friendly interfaces. Let's build something amazing together — reach out today! 🚀
          </p>
        </motion.div>


        <motion.div
          className="flex flex-col items-center text-center justify-center rounded-xl"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.form
            ref={formRef}
            className="w-[500px] max-md:w-full bg-white flex flex-col justify-center shadow-md space-y-8 rounded-xl px-10 py-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h3 className="font-bold text-2xl mb-2">Get in Touch</h3>
            <div className="flex flex-col space-y-2">
              <label htmlFor="from_name" className="text-left font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="from_email" className="text-left font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-left font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Type your message here..."
              />
            </div>
            {/* Hidden input for time */}
            <input type="hidden" name="time" />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
