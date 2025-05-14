import React from 'react'
import Email from '/email.png'
import Phone from '/phone-call.png'
const Footer = () => {
  return (
    <>
        <footer className='flex md:flex-col px-10  max-md:flex-col max-md:p-0'>
            <hr className='border border-gray-400 opacity-30'/>
            <div className="flex justify-between py-10 max-xl:flex-col px-20 max-xl:space-y-5">
                <div className="space-y-2">
                    <h2 className='font-bold'>Phone</h2>
                    <div className="flex items-center space-x-1">
                    <img src={Phone} alt="" className='w-7 max-md:w-5' /> 
                     <p className='text-slate-500'>+63 99 425 86519</p>
                    </div>
                   
                </div>
                <div className="space-y-2">
                    <h2 className='font-bold'>Email</h2>
                    <div className="flex items-cente space-x-1">
                    <img src={Email} alt="" className='w-7 max-md:w-5 ' /> 
                    <p className='text-slate-500'>edgarrodilorosa@gmail.com</p>
                    </div>
                </div>
                <div className="self-center max-xl:m-auto">
                    <p className='text-gray-700 text-sm'>© 2025 By Edgar Orosa.</p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer