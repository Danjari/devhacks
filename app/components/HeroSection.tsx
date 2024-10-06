
// // components/Hero.jsx
// import React from 'react';
// import Button from './Button';
// import Image from 'next/image';
// const HeroSection = () => {
//   return (
//     <section className="flex flex-col items-center justify-center h-screen text-center text-black p-6 shadow-inner">
//       <h1 className="text-5xl font-bold mb-8">The Future of Learning</h1>
//       <div className="flex space-x-6 mb-8">
//         <Button text="I am a Professor" variant="secondary" />
//         <Button text="I am a student" variant="primary" />
//       </div>
//       <p className="max-w-md text-lg mb-6">
//         SynapsED is a personalized educational tool designed to transform the learning experience by tailoring educational pathways to the individual needs of students.
//       </p>
//       <div className="relative w-full max-w-5xl h-96 mb-8">
//           <Image
//             src="/screenshot.png" // Replace with the actual path of your image in the public directory
//             alt="Synapse Demo"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-lg shadow-2xl"
//           />
//         </div>
//     </section>
//   );
// };

// export default HeroSection;

// components/Hero.jsx
import React from 'react';
import Button from './Button';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center text-black shadow-inner">
      <h1 className="text-5xl font-bold mb-8">The Future of Learning</h1>
      <div className="flex space-x-6 mb-8">
        <Button text="I am a Professor" variant="secondary" />
        <Button text="I am a student" variant="primary" />
      </div>
      <p className="max-w-md text-lg mb-6">
        SynapsED is a personalized educational tool designed to transform the learning experience by tailoring educational pathways to the individual needs of students.
      </p>
      
      {/* Image with Enhanced Shadow and Animation */}
      <div className="relative w-full max-w-5xl h-96 group">
        <Image
          src="/screenshot.png" 
          alt="Synapse Demo"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-2xl group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-500"
        />
        
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 rounded-lg border-transparent group-hover:border-blue-400 group-hover:opacity-100 opacity-0 transition duration-500"></div>
      </div>
    </section>
  );
};

export default HeroSection;
