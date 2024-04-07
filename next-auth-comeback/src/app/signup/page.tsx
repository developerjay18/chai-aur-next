'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

function SignupPage() {
  const [user, setuser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/signup', user);
      console.log('USER SIGNUP SUCCESSFULLY');
      router.push('/login');
      setLoading(false);
    } catch (error: any) {
      console.log('ERROR WHILE DOING SIGNUP FROM FRONT-END', error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setuser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        name="username"
        value={user.username}
        onChange={(e) => handleChange(e)}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        name="email"
        value={user.email}
        onChange={(e) => handleChange(e)}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        name="password"
        value={user.password}
        onChange={(e) => handleChange(e)}
        placeholder="password"
      />
      <button
        onClick={handleSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? 'No signup' : 'Signup'}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

export default SignupPage;
