import React from 'react'
import comingsoonImg from '/coming-soon.png'
import { useNavigate } from 'react-router-dom'
const UnderWorkPage = () => {

    const navigate = useNavigate()

  return (
    <>
        <div className="flex flex-col items-center justify-center h-screen space-y-3 max-xl:text-center">
            <img src={comingsoonImg} alt="Coming Soon" className="w-40" />
            <p className="text-gray-600 mt-2">
                This page is currently under development. We appreciate your patience.
            </p>
            <button onClick={() => navigate('/')} className=" px-4 py-2 cursor-pointer bg-yellow-600 text-white rounded">Go to Home</button>
        </div>
    </>
  )
}

export default UnderWorkPage