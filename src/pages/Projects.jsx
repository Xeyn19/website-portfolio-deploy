import React from 'react';
import projectdata from '../assets/data.json';
import { useState , useEffect } from 'react';
import Spinner from '../components/Spinner';

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(projectdata)
        setFilteredData(projectdata)
      } catch (error) {
        console.error('Fetch data error', error)
      } finally {
        setLoading(false);
      }
    }
    fetchData();

  }, []);

  const handleRecentProjectsFiltered = (year) => {
    year === 'all' ? setFilteredData(data) : setFilteredData(data.filter((project) => project.date === year));
  }

  if(loading){
    return <Spinner /> 
  }
  
  return (
    <div className="flex min-h-screen">
      <div className="w-full h-full px-40 py-20 max-md:px-5 max-xl:p-0 max-xl:text-center">
        <h1 className="font-bold text-4xl tracking-wider block">Projects</h1>
        <div className="button-projects flex gap-3 my-6 max-md:grid max-md:grid-cols-2 max-md:px-20">
          <button className='py-2 px-3 bg-yellow-600 font-medium rounded-md hover:bg-yellow-700 transition-all duration-300 ease-in-out
          text-white max-md:text-[12px] max-md:py-1 max-md:px-2 cursor-pointer' 
            onClick={() => handleRecentProjectsFiltered(2025)}>Recent Projects (2025)</button>
          <button className='py-2 px-3 bg-yellow-600 font-medium rounded-md hover:bg-yellow-700 transition-all duration-300 ease-in-out
          text-white max-md:text-[12px] max-md:py-1 max-md:px-2 cursor-pointer'
            onClick={() => handleRecentProjectsFiltered(2024)}>Previous Projects (2024)</button>
          <button className='py-2 px-3 bg-yellow-600 font-medium rounded-md hover:bg-yellow-700 transition-all duration-300 ease-in-out
          text-white max-md:text-[12px] max-md:py-1 max-md:px-2 cursor-pointer'
            onClick={() => handleRecentProjectsFiltered(2023)}>Previous Projects (2023)</button>
          <button className='py-2 px-3 bg-yellow-600 font-medium rounded-md hover:bg-yellow-700 transition-all duration-300 ease-in-out
          text-white max-md:text-[12px] max-md:py-1 max-md:px-2 cursor-pointer'
            onClick={() => handleRecentProjectsFiltered('all')}>All Projects</button>
        </div>
        {filteredData.length > 0 ? (
          filteredData.map((project) => (
            <div key={project.id} className="flex space-x-30 mt-10 mb-40 max-md:flex-col max-md:mt-4 max-md:mb-10 max-xl:flex-col">
      
            <div className="w-[50%] space-y-5 max-md:w-[100%] self-center max-md:self-start max-xl:w[100%] max-xl:m-auto max-md:pt-5" >
              <h2 className="font-bold text-lg max-xl:text-xl">{project.title}</h2>
              <p className="text-gray-600 text-sm max-xl:text-md">{project.description}</p>
           
              <div className="flex space-x-2 mt-8 max-xl:mb-5 max-md:mb-0 max-md:m-auto">
                <span className='font-bold'>Programming: </span>
                {project.technologies.map((image, index) => (
                  <img key={index} src={image} alt="Tech Logo" className="w-7 h-7 rounded-sm " />
                ))}
              </div>
            </div>

            <div className="w-[50%] max-md:w-[100%] max-md:mt-10 max-xl:w[100%] max-xl:m-auto max-md:mb-15"> 
              <img src={project.image} alt={project.title} className="w-[500px] rounded-lg shadow-sm" />
            </div>
          </div>
          ))
        ) : (
          <p className="text-gray-600 text-center mt-5">No projects found for the selected year.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
