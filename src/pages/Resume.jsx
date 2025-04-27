import React from 'react'
import { motion } from 'framer-motion'
import EducationTimeline from '../components/EducationTimeline'

const Resume = () => {
  return (
    <>
      <div className="flex min-h-screen justify-center py-20 max-md:px-5 max-md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-white px-10 py-10 w-[700px] h-[910px] shadow-md rounded-lg max-md:h-full max-md:text-sm"
        >
          <div className="flex flex-col items-center space-y-2 w-full">
            <h1 className='text-3xl font-medium'>Edgar Orosa</h1>
            <span className='text-sm text-slate-800 max-md:text-center'>Anito Mapayapa Village Pulang Lupa Uno Las Pinas City</span>
            <span className='text-sm text-slate-800'>09383634378</span>
            <span className='text-sm text-slate-800'>Edgarrodilorosa@gmail.com</span>
            <hr className='border w-full opacity-40 mt-2'/>
          </div>

          <div className="w-full space-y-2">
            <h1 className='text-lg font-medium mt-2'>About</h1>
            <span className='text-[12px] text-slate-800 text-left'>
            I am a dedicated front-end developer with a solid foundation in creating responsive, user-centric web applications. Currently, I am advancing my skills toward full-stack development with the goal of becoming a well-rounded software engineer. I am passionate about building seamless, high-performance digital experiences and continuously expanding my expertise across both front-end and back-end technologies. My mission is to develop applications that are not only visually appealing but also scalable, efficient, and intuitive to use.
            </span>
            <hr className='border w-full opacity-40 mt-4'/>
          </div>

          <div className="w-full space-y-2">
            <h1 className='text-lg font-medium mt-2'>Education</h1>
            <EducationTimeline />
            <hr className='border w-full opacity-40 mt-5'/>
          </div>

          <div className="w-full space-y-2">
            <h1 className='text-lg font-medium mt-2'>Certifications</h1>
            <ul className="list-disc pl-6 text-[12px] text-slate-800">
              <li>
                <a href="https://www.codecred.dev/verify/80e919db-a09d-4288-95bb-29ea813727eb" target='_blank' rel='noreferrer' className='hover:underline font-medium duration-400 ease-in-out transition-transform'>
                  HTML Certification
                </a>
              </li>
              <li>
                <a href="https://www.udemy.com/certificate/UC-0ad348b2-8485-4189-805b-8bbce109bbfe/" target='_blank' rel='noreferrer' className='hover:underline font-medium duration-400 ease-in-out transition-transform'>
                  CSS Certification
                </a>
              </li>
            </ul>
            <hr className='border w-full opacity-40 mt-5'/>
          </div>

          <div className="w-full space-y-2">
            <h1 className='text-lg font-medium mt-2'>Tech Stack</h1>
            <ul className='grid grid-cols-3 list-disc text-black pl-6 text-sm max-md:grid-cols-2'>
              <li>HTML</li>
              <li>CSS</li>
              <li>Tailwind CSS</li>
              <li>Daisy UI</li>
              <li>Javascript</li>
              <li>React JS</li>
              <li>Git</li>
              <li>Github</li>
              <li>Material UI</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Resume
