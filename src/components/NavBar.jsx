import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='font-primary w-full px-10 py-10 max-md:hidden'>
      <div className="flex justify-between">
        <div className="flex flex-row justify-center items-center space-x-3">
          <NavLink to='/'>
            <h1 className='font-medium text-2xl'>Edgar Orosa</h1>
          </NavLink>
          <div>|</div>
          <p className='text-gray-500 text-sm'>Front-End Developer</p>
        </div>
        <div className="flex space-x-5 text-sm text-gray-700 items-center">
          <NavLink 
            to='/resume'
            className={({ isActive }) => 
              isActive 
                ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors  ease-in-out duration-500'
            }
          >
            Resume
          </NavLink>
          <div>|</div>
          <NavLink 
            to='/projects' 
            className={({ isActive }) => 
              isActive 
               ? 'text-yellow-600 font-semibold' 
                : 'hover:text-yellow-500 transition-colors  ease-in-out duration-500'
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
                : 'hover:text-yellow-500 transition-colors  ease-in-out duration-500'
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
                : 'hover:text-yellow-500 transition-colors  ease-in-out duration-500'
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
