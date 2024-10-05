'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useSignUp } from '@clerk/clerk-react'; // Import Clerk's useSignUp hook
export default function Home() {

  const [data, setData] = useState('');
  
 
  const { signUp } = useSignUp();
  const {isLoaded, isSignedIn, user} = useUser();

  useEffect(() => {
    const saveToMongoDB = async () => {
      if (isSignedIn) {
        const response = await fetch('/api/users', { // Adjust the API endpoint as necessary
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              id: user?.id,
              email: user?.emailAddresses[0].emailAddress,
              firstName: user?.firstName,
              lastName: user?.lastName,
            }
          ),
        });
        if (!response.ok){
          console.log('There was an error saving to MongoDB')
        }
      }
    }
   saveToMongoDB();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello, {user && user?.firstName}</h1>
    </div>
  );
}
