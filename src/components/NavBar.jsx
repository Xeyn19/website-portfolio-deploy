import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='font-primary w-full px-10 py-10 relative'>
      <div className="flex justify-between items-center max-md:flex-col max-md:items-center max-md:space-y-5">
        <div className="flex flex-row justify-center items-center space-x-3 max-md:space-x-10">
          <NavLink to='/'>
            <h1 className='font-medium text-2xl max-md:text-sm'>Edgar Orosa</h1>
          </NavLink>
          <div className='max-md:hidden'>|</div>
          <p className='text-gray-500 text-sm'>Front-End Developer</p>
          <button 
            className="md:hidden text-gray-700 focus:outline-none ml-3" 
            onClick={toggleMenu}
          >
            <svg
  className="w-8 h-8 cursor-pointer"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4 6h16M4 12h16M4 18h16"
  />
</svg>

          </button>
        </div>
        <div className={`flex-col md:flex md:flex-row space-x-5 text-sm text-gray-700 items-center ${isOpen ? 'flex' : 'hidden'}`}>
          <NavLink 
            to='/resume'
            className={({ isActive }) => 
              isActive 
                ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors ease-in-out duration-500'
            }
          >
            Resume
          </NavLink>
           <div>|</div>
          <NavLink 
            to='/certificates' 
            className={({ isActive }) => 
              isActive 
               ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors ease-in-out duration-500'
            }
          >
            Certificates
          </NavLink>
          <div>|</div>
          <NavLink 
            to='/projects' 
            className={({ isActive }) => 
              isActive 
               ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors ease-in-out duration-500'
            }
          >
            Projects
          </NavLink>
          <div>|</div>
          <NavLink 
            to='/skills' 
            className={({ isActive }) => 
              isActive 
                ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors ease-in-out duration-500'
            }
          >
            Skills
          </NavLink>
          <div>|</div>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => 
              isActive 
                ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors ease-in-out duration-500'
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center space-y-5 z-10">
          <NavLink 
            to='/resume'
            className='text-white text-lg'
            onClick={toggleMenu}
          >
            Resume
          </NavLink>
          <NavLink 
            to='/certificates' 
            className='text-white text-lg'
            onClick={toggleMenu}
          >
            Certificates
          </NavLink>
          <NavLink 
            to='/projects' 
            className='text-white text-lg'
            onClick={toggleMenu}
          >
            Projects
          </NavLink>
          <NavLink 
            to='/skills' 
            className='text-white text-lg'
            onClick={toggleMenu}
          >
            Skills
          </NavLink>
          <NavLink 
            to='/contact' 
            className='text-white text-lg'
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default NavBar