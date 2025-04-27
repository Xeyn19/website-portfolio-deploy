import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import tech from '../assets/techdata.json';
import Spinner from '../components/Spinner';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const [techData, setTechData] = useState([]);
  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTechData(tech);
      } catch (error) {
        console.error('Fetch data error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-10 pt-10 pb-40 max-md:px-5 text-center max-md:pt-0">
      
      <motion.h1
        className="block text-4xl font-bold tracking-wider"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        Skills
      </motion.h1>

      <motion.h3
        className="mt-7 mb-10"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
     <span className="text-black block max-w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
     I am a proficient front-end developer with expertise in HTML5, CSS, JavaScript, Tailwind CSS, React.js, DaisyUI, Material UI, and Vercel, specializing in the creation of responsive and intuitive web interfaces. I utilize DaisyUI components to ensure consistent and visually cohesive designs, leverage Material UI for polished and functional UI components, deploy applications efficiently with Vercel for optimal performance and reliability, and employ Git and GitHub for version control and seamless collaboration on development projects.
</span>



      </motion.h3>

      <motion.div
        className="grid grid-cols-3 gap-20 max-md:gap-10 max-lg:gap-15 max-lg:grid-cols-2 max-sm:grid-cols-1 mt-10"
      >
        {techData.map((data) => (
          <motion.div
            key={data.id}
            className="flex items-center justify-center space-x-6 bg-white w-80 h-40 shadow-md rounded-lg p-6 cursor-pointer"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={data.image}
              alt={data.tech}
              className="w-20 h-20 rounded-lg object-contain"
            />

            <div className="space-y-2 text-left">
              <h2>
                <span className="font-bold text-lg">Tech:</span>{' '}
                <span className="text-md text-gray-600">{data.techname}</span>
              </h2>
              <h2 className="text-lg">
                <span className="font-bold text-lg">Experience:</span>{' '}
                <span className="text-md text-gray-600">{data.experience}</span>
              </h2>
              <a
                href={data.techlink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 transition-all duration-300 border-b-2 border-transparent hover:border-blue-700"
              >
                Learn more
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
