'use client';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';

export default function Home() {

  const [data, setData] = useState('');

  const connectToDB = async () => {
    const response = await fetch('/api/users', {
      method: 'GET', // Specify the HTTP method (GET, POST, etc.)
    });
    const data = await response.json();
    const message = data?.message;
    setData(message);
  }

  useEffect(() => {
    connectToDB(); // Make sure this is called to fetch data
}, []); // Empty dependency array to run once on compon

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"> <NavBar />
      <HeroSection /></div></div>
     
       
  
    </div>
  );
} // Add this closing brace to properly close the function or component