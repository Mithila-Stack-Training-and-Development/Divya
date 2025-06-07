import React from 'react'

const Nav = () => {
  return (
    <nav className='flex justify-between items-center bg-violet-900 p-4 text-white py-3'>
      <div className='font-bold'>
        <span className='text-lg'>दिनचर्या - </span>
        <span className='text-sm ml-2'>Your Daily Flow</span>
      </div>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Nav