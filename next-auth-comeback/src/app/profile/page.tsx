'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      console.log('USER LOGGED OUT SUCCESSFULLY');
      toast.success('logged out successfully');
      router.push('/login');
    } catch (error: any) {
      console.log('ERROR WHILE LOGOUT FROM FRONT-END', error);
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.post('/api/users/me');

      console.log(res);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log('ERROR WHILE FETCHING USER DATA FROM FRONT-END', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={handleLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={fetchUserData}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
    </div>
  );
}

export default ProfilePage;
