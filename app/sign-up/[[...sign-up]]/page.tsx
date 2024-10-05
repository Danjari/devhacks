import { SignUp } from '@clerk/nextjs'
import React from 'react'; // {{ edit_1 }}
export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><SignUp /></div>
  );
  
}