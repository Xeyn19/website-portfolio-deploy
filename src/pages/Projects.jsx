import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import projectdata from '../assets/data.json';
import Spinner from '../components/Spinner';

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(projectdata);
        setFilteredData(projectdata);
      } catch (error) {
        console.error('Fetch data error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleRecentProjectsFiltered = (year) => {
    setSelectedYear(year);
    setFilteredData(year === 'all' ? data : data.filter((project) => project.date === parseInt(year)));
    setIsDropdownOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div className="flex min-h-screen">
      <div className="w-full h-full px-40 py-20 max-md:px-5 max-xl:p-0 max-xl:text-center">
        
    
        <motion.h1 
          className="font-bold text-4xl tracking-wider block"
          whileInView={{ opacity: 1, y: scrollDirection === 'down' ? 0 : -10 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Projects
        </motion.h1>

    
        <div className="relative inline-block my-6 max-md:px-20">
          <button 
            className="py-2 px-4 bg-yellow-600 text-white max-md:text-[12px] font-medium rounded-md cursor-pointer 
            hover:bg-yellow-700 transition-all duration-300 ease-in-out flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedYear === 'all' 
              ? 'All Projects' 
              : selectedYear === '2025' 
              ? `Recent Projects (${selectedYear})` 
              : `Previous Projects (${selectedYear})`}
            <span className="ml-2">▼</span>
          </button>

          {isDropdownOpen && (
            <motion.ul 
              className="absolute left-0 mt-2 w-52 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {['all', '2025', '2024', '2023'].map((year) => (
                <li
                  key={year}
                  className="px-4 py-2 max-md:text-[12px] cursor-pointer hover:bg-yellow-600 hover:text-white transition-all duration-200"
                  onClick={() => handleRecentProjectsFiltered(year)}
                >
                  {year === 'all' 
                    ? 'All Projects' 
                    : year === '2025' 
                      ? `Recent Projects (${year})` 
                      : `Previous Projects (${year})`}
                </li>
              ))}
            </motion.ul>
          )}
        </div>

    
        {filteredData.length > 0 ? (
          filteredData.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="flex space-x-30 mt-10 mb-40 max-md:flex-col max-md:mt-4 max-md:mb-10 max-xl:flex-col"
              whileInView={{ opacity: 1, y: scrollDirection === 'down' ? 0 : -10 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }} 
            >
 
              <motion.div 
                className="w-[50%] space-y-5 max-md:w-[100%] self-center max-md:self-start max-xl:w[100%] max-xl:m-auto max-md:pt-5"
                whileInView={{ opacity: 1, x: scrollDirection === 'down' ? 0 : -10 }}
                initial={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }} 
              >
                <h2 className="font-bold text-lg max-xl:text-xl">{project.title}</h2>
                <p className="text-gray-600 text-sm max-xl:text-md">{project.description}</p>
              </motion.div>

            
              <motion.div 
                className="w-[50%] max-md:w-[100%] max-md:mt-10 max-xl:w[100%] max-xl:m-auto max-md:mb-15"
                whileInView={{ opacity: 1, scale: scrollDirection === 'down' ? 1 : 0.98 }}
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
              > 
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-[500px] rounded-lg shadow-sm"
                />
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="text-gray-600 text-center mt-5"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No projects found for the selected year.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
