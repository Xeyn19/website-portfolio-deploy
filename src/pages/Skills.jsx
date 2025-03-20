import React from 'react'
import tech from '../assets/techdata.json'

const Skills = () => {
  return (
    <div className="flex min-h-screen flex-col items-center px-10 pt-10 pb-40 max-md:px-5 text-center max-md:pt-0">
      <h1 className='block text-4xl font-bold'>Skills</h1>
      <h3 className='mt-7 mb-10'>
        I’m a skilled front-end developer with expertise in HTML5, CSS, JavaScript, <br />
        Tailwind CSS, and React.js, creating responsive and user-friendly web interfaces.
      </h3>
      <div className="grid grid-cols-3 gap-20 max-md:gap-10 max-lg:gap-15 max-lg:grid-cols-2 max-sm:grid-cols-1 mt-10">
        {tech.map((techData) => (
          <div key={techData.id} className="flex items-center justify-center space-x-6 bg-white w-80 h-40 shadow-md rounded-lg p-6">
            <img src={techData.image} alt={techData.tech} className='w-20 h-20 rounded-lg object-contain' />
            <div className="space-y-2 text-left">
              <h2>
                <span className='font-bold text-lg'>Tech:</span> <span className='text-md text-gray-600'>{techData.techname}</span>
              </h2>
              <h2 className='text-lg'>
                <span className='font-bold text-lg'>Experience:</span> <span className='text-md text-gray-600'>{techData.experience}</span>
              </h2>
              <a href={techData.techlink} target='_blank' className="text-blue-500 transition-all duration-300 border-b-2 border-transparent hover:border-blue-700">
                Learn more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
