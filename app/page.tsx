'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>This is your data: {data}</h1>
    </div>
  );
}
