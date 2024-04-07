'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

function LoginPage() {
  const [user, setuser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/login', user);
      console.log('USER LOGGEDIN SUCCESSFULLY');
      router.push('/profile');
      setLoading(false);
    } catch (error: any) {
      console.log('ERROR WHILE DOING LOGIN FROM FRONT-END', error);
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
    if (user.password.length > 0 && user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <hr />

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
        onClick={handleLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? 'No login' : 'login'}
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}

export default LoginPage;
