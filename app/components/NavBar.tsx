import React from 'react';
import Image from 'next/image'; // Ensure correct import

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center w-full p-4 bg-white/40 backdrop-blur-md shadow-md rounded-lg">
        <div className='flex space-x-2 justify-between'>
        <Image src="/logo.svg" alt="Logo" width={30} height={30} className="mr-2 ml-6" />
       <a href="/" className='text-lg font-semibold text-black ml-12'>SynapsED</a>
       
       </div>
      <div className="flex space-x-12 mr-12">
        <a href="#" className="text-lg font-semibold text-black">Home</a>
        <a href="#" className="text-lg font-semibold text-black">About</a>
        <a href="#" className="text-lg font-semibold text-black">FAQ</a>
        <a href="#" className="text-lg font-semibold text-black">Schools</a>
      </div>
      <button className="px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all mr-12">
        Log In
      </button>
    </nav>
  );
};

export default NavBar;
