// // pages/dashboard.tsx
// "use client"
// import PathwayDisplay from '@/app/components/PathwayDisplay';
// import React from 'react';


// const Dashboard: React.FC = () => {
//   return (
//     <div className='flex flex-col items-center justify-center h-screen bg-gray-100 text-black'>
//       <h1>Welcome to Your Learning Pathway</h1>
//       {/* Placeholder for React Flow component */}
   
//       <PathwayDisplay/>
//     </div>
//   );
// };

// export default Dashboard;
// pages/studentDashboard.tsx
"use client"
import React from 'react';
import Sidebar from '../../components/SideBar';
import InputField from '../../components/InputField';
import TopicCard from '../../components/TopicCard';
import { useUser } from '@clerk/clerk-react'



const StudentDashboard: React.FC = () => {
  const { user } = useUser()
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64  p-8 w-full h-screen bg-gradient-to-b from-white-400 to-purple flex flex-col items-center justify-center">
      <h2 className="text-4xl text-purple-800 mb-4">Hello {user?.firstName},</h2>
        <h1 className="text-4xl font-bold text-black mb-4">This is Pr. Leonard&apos;s Linear Algebra Class</h1>
        <p className="text-black mb-8">Let&apos;s get you started on creating a synapse!</p>

        {/* Input Field */}
        <InputField />

        {/* Topic Cards */}
        <div className="mt-8">
          <h2 className="text-black text-2xl font-bold mb-4">What are your goals? What do you want to use Linear Algebra for?</h2>
          <div className="grid grid-cols-3 gap-4">
            {['Economics', 'Physics', 'Computer Science', 'Data Science', 'Cryptography', 'Engineering'].map((topic) => (
              <TopicCard key={topic} text={topic} />
            ))}
          </div>
        </div>
        </main>

        {/* Explanation Cards */}
       
      
    </div>
  );
};

export default StudentDashboard;
