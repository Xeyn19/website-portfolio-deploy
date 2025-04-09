import React from 'react';
import { motion } from 'framer-motion';
import edgarprofile from '/edgar prof.jpg';
import facebook from '/facebook.png';
import instagram from '/instagram.png';
import linkedin from '/linkedin.png';
import github from '/github.png'

const HomePage = () => {
  return (
    <motion.div
      className="flex justify-center items-center lg:min-h-screen space-x-10 
         max-md:flex-col max-md:space-x-0 max-md:p-10 max-xl:flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      
      <motion.div
        className="max-md:order-2 max-md:mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img
          src={edgarprofile}
          alt="Profile"
          className="w-[500px] rounded-full mb-20 shadow-md max-md:m-auto
                 max-md:w-[300px] max-lg:mb-0 max-xl:w-[400px] max-xl:mt-20"
        />
      </motion.div>


      <motion.div
        className="w-[460px] self-start mt-35 space-y-6 mr-7 max-md:m-0
             max-md:w-full max-md:text-left max-md:px-2 max-xl:m-auto max-xl:mt-15"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h1 className="font-bold text-4xl max-md:text-xl">
          <span>Hello, I'm</span> <br /> Front-End React Developer.
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="font-bold text-xl mb-2 max-md:text-sm">About Me</h2>
          <p className="text-gray-500 max-md:text-sm">
            I'm a passionate front-end developer with a strong foundation in building responsive and user-friendly web applications. I'm currently working toward becoming a software engineer or full-stack developer, expanding my skills in both front-end and back-end technologies. My goal is to create seamless, high-performing applications that provide an excellent user experience while mastering the complete development process.
          </p>
        </motion.div>


        <motion.div
          className="flex space-x-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[ 
            { img: facebook, link: "https://www.facebook.com/edgar.orosa.9/" }, 
            { img: linkedin, link: "https://www.linkedin.com/in/edgar-orosa-a43a15333/" }, 
            { img: instagram, link: "https://www.instagram.com/c_stor_/" },
            { img: github, link: "https://github.com/Xeyn19" }
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={item.img}
                alt="Social Icon"
                className="w-8 h-8 hover:-translate-y-2 transition-all max-md:w-7 max-md:h-7
                  ease-in-out duration-700 cursor-pointer hover:drop-shadow-xl"
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
