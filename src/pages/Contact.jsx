import React from 'react';
import { motion } from 'framer-motion';
import edgar from '/edgar2.jpg';
import phone from '/phone-call.png';
import fb from '/facebook.png';
import ig from '/instagram.png';
import linkedin from '/linkedin.png';
import email from '/email.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center xl:pb-50 max-md:pb-20 max-md:w-full max-md:px-10 max-xl:w-full max-xl:px-20 max-xl:pb-40">

      {/* Title */}
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

        {/* Profile Section */}
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
          <p className="text-center text-sm max-md:text-[13px]">
            Are you looking for a skilled Front-End React Developer to bring your ideas to life? I have a strong foundation in HTML, CSS, and JavaScript, combined with expertise in modern tools like Tailwind CSS and React.js. I’m also experienced in using CSS frameworks like Daisy UI and React Material UI to create clean, responsive, and user-friendly interfaces. Let's build something amazing together — reach out today! 🚀
          </p>
        </motion.div>

        {/* Contact Details Section */}
        <motion.div
          className="flex flex-col items-center text-center justify-center rounded-xl"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            className="w-[500px] max-md:w-full h-[450px] bg-white flex flex-col justify-center shadow-md space-y-10 rounded-xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >

            {/* Phone */}
            <div className="space-y-3">
              <h3 className="font-bold text-2xl">Phone</h3>
              <div className="flex justify-center items-center space-x-1">
                <img src={phone} className="w-7 h-7" alt="Phone" />
                <p className="text-gray-600 font-medium text-lg">+63 99 425 86519</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h3 className="font-bold text-2xl">Social Media</h3>
              <div className="flex justify-center items-center space-x-4">
                <motion.a
                  href="https://www.facebook.com/edgar.orosa.9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={fb} alt="Facebook" className="w-7 h-7" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/c_stor_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={ig} alt="Instagram" className="w-7 h-7" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/edgar-orosa-a43a15333/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={linkedin} alt="LinkedIn" className="w-7 h-7" />
                </motion.a>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h3 className="font-bold text-2xl">Email</h3>
              <div className="flex justify-center space-x-1">
                <img src={email} alt="Email" className="w-7 h-7" />
                <p className="font-medium text-gray-600">edgarrodilorosa@gmail.com</p>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
