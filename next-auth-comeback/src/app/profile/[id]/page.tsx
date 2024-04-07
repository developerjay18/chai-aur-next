import React from 'react';

function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-10">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="mt-10 p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default page;
