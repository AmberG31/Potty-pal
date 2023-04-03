import React, { useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function Navbar() {
  const searchRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(searchRef.current.value);
    searchRef.current.value = '';
  };

  return (
    <div className="flex w-full items-center justify-between border border-b p-6">
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="flex gap-3">
          <img className="w-16" src="/mini-logo.svg" alt="" />
          <div className="flex flex-col justify-center">
            <h1 id="logo-title" className="text-3xl">
              PottyPal
            </h1>
            <p className="capitalize text-gray-400">toilet rating web app</p>
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex rounded-lg border px-4 py-1"
        >
          <MagnifyingGlassIcon className="w-5" />
          <input
            type="text"
            ref={searchRef}
            className="h-full p-3 font-thin focus:outline-none lg:min-w-[300px]"
            placeholder="Search location"
          />
        </form>
        {/* Search Bar */}
      </div>
      {/* Buttons */}
      <div className="flex gap-3">
        <button type="button" className="btn min-w-[200px]">
          Add Toilet
        </button>
        <button
          type="button"
          className="btn-outline min-w-[200px] text-primary"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
