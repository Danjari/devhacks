'use client'
import { SignUp } from '@clerk/nextjs'
import React from 'react'; // {{ edit_1 }}
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs'


export default function Page() {


  const {isLoaded, isSignedIn, user} = useUser();


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><SignUp/></div>
  );
}