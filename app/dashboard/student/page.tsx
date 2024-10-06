// pages/dashboard.tsx
"use client"
import PathwayDisplay from '@/app/components/PathwayDisplay';
import React from 'react';


const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 text-black'>
      <h1>Welcome to Your Learning Pathway</h1>
      {/* Placeholder for React Flow component */}
   
      <PathwayDisplay/>
    </div>
  );
};

export default Dashboard;