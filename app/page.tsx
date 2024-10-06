'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

import Link  from "next/link";

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
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Welcome to synapsED</h1>
      <Link href="/dashboard/student">
        Go to Dashboard
      </Link>
       
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      <h1>This is your data: {data}</h1>

    </div>
  );
}
