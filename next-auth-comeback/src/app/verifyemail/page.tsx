'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      console.log('USER LOGGEDIN SUCCESSFULLY');
      setVerified(true);
    } catch (error: any) {
      console.log('ERROR WHILE VERIFYING EMAIL ON FRONT-END', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : 'no token'}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;
