import React from 'react'
import edgarprofile from '/edgar prof.jpg'
import facebook from '/facebook.png'
import instagram from '/instagram.png'
import linkedin from '/linkedin.png'

const HomePage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen space-x-10
         max-md:flex-col max-md:space-x-0 max-md:p-10 max-xl:flex-col">
        <div className="max-md:order-2 max-md:mt-8">
          <img
             src={edgarprofile}
             alt="Profile"
             className='w-[500px] rounded-full mb-20 shadow-md max-md:m-auto
                 max-md:w-[300px] max-lg:mb-0 max-xl:w-[400px] max-xl:mt-20'
           />
        </div>
        <div className="w-[460px] self-start mt-35 space-y-6 mr-7 max-md:m-0
             max-md:w-full max-md:text-left max-md:px-2 max-xl:m-auto max-xl:mt-15">
          <h1 className='font-bold text-4xl max-md:text-xl'>
            <span>Hello, I'm</span> <br /> Front-End React Developer.
          </h1>
          <div className="">
            <h2 className='font-bold text-xl mb-2 max-md:text-sm'>About Me</h2>
            <p className='text-gray-500 max-md:text-sm'>
              I'm a passionate front-end developer with a strong foundation in building responsive and user-friendly web applications. I'm currently working toward becoming a software engineer or full-stack developer, expanding my skills in both front-end and back-end technologies. My goal is to create seamless, high-performing applications that provide an excellent user experience while mastering the complete development process.
            </p>
          </div>
          <div className="flex space-x-2">
            <a
               href="https://www.facebook.com/edgar.orosa.9/"
               target="_blank"
               rel="noopener noreferrer"
            >
              <img
                 src={facebook}
                 alt="Facebook"
                 className='w-8 h-8 hover:-translate-y-2 transition-all max-md:w-7 max-md:h-7
                   ease-in-out duration-700 cursor-pointer hover:drop-shadow-xl'
              />
            </a>
              <a
               href="https://www.linkedin.com/in/edgar-orosa-a43a15333/"
               target="_blank"
               rel="noopener noreferrer"
            >
              <img
                 src={linkedin}
                 alt="LinkedIn"
                 className='w-8 h-8 hover:-translate-y-2 transition-all max-md:w-7 max-md:h-7
                  ease-in-out duration-700 cursor-pointer hover:drop-shadow-xl'
              />
            </a>
            <a
               href="https://www.instagram.com/c_stor_/"
               target="_blank"
               rel="noopener noreferrer"
            >
              <img
                 src={instagram}
                 alt="Instagram"
                 className='w-8 h-8 hover:-translate-y-2 transition-all max-md:w-7 max-md:h-7
                   ease-in-out duration-700 cursor-pointer hover:drop-shadow-xl'
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage