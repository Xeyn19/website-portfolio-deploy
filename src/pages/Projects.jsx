import React from 'react';
import projectdata from '../assets/data.json';

const Projects = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full h-full px-40 py-20 max-md:px-5 max-xl:p-0 max-xl:text-center">
        <h1 className="font-bold text-4xl tracking-wider block">Projects</h1>
        {projectdata.map((project) => (
          <div key={project.id} className="flex space-x-30 mt-10 mb-40 max-md:flex-col max-md:mt-4 max-md:mb-10 max-xl:flex-col">
      
            <div className="w-[50%] space-y-4 max-md:w-[100%] self-center max-md:self-start max-xl:w[100%] max-xl:m-auto">
              <h2 className="font-bold text-lg max-xl:text-xl">{project.title}</h2>
              <p className="text-gray-600 text-sm max-xl:text-md">{project.description}</p>
           
              <div className="flex space-x-2 mt-8 max-xl:mb-5 max-md:mb-0 max-md:m-auto">
                <span className='font-bold'>Programming: </span>
                {project.technologies.map((image, index) => (
                  <img key={index} src={image} alt="Tech Logo" className="w-7 h-7 rounded-sm " />
                ))}
              </div>
            </div>

            <div className="w-[50%] max-md:w-[100%] max-md:mt-10 max-xl:w[100%] max-xl:m-auto"> 
              <img src={project.image} alt={project.title} className="w-[500px] rounded-lg shadow-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
