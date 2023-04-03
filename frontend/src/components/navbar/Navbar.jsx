import React, { useRef, Fragment } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { logout, token } = React.useContext(AuthContext);
  const searchRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(searchRef.current.value);
    searchRef.current.value = '';
  };

  return (
    <div className="flex w-full border border-b p-6">
      <div className="grid w-full grid-cols-4 items-center justify-between gap-4 sm:grid-cols-3 sm:justify-between md:gap-10">
        {/* Logo */}
        <div id="branding" className="max-w-fit shrink">
          <Link to="/">
            <div className="flex gap-4">
              <div className="">
                <img className="w-16" src="/mini-logo.svg" alt="" />
              </div>
              <div className="hidden flex-col justify-center sm:block">
                <h1 id="logo-title" className="text-3xl">
                  PottyPal
                </h1>
                <p className="capitalize text-gray-400">
                  toilet rating web app
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div id="search-bar" className="col-span-3 sm:col-span-1">
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
        </div>
        <div
          id="menu-buttons"
          className="col-span-4 flex justify-center gap-3 sm:col-span-1"
        >
          <div className="flex gap-3">
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="flex items-center px-2">
                      Toilets
                      <ChevronDownIcon
                        className="ml-2 mr-1 h-5 w-5 items-center"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                            >
                              View Toilets
                            </a>
                          )}
                        </Menu.Item>
                        {token && (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/toilets/new"
                                className={`${
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Add New Toilet
                              </a>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
          <div className="flex gap-3">
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="flex items-center rounded-md px-2">
                      User
                      {open ? (
                        <ChevronUpIcon
                          className="ml-2 mr-1 h-5 w-5 items-center"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDownIcon
                          className="ml-2 mr-1 h-5 w-5 items-center"
                          aria-hidden="true"
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        {token ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/user/profile"
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block px-4 py-2 text-sm`}
                                >
                                  Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } block w-full px-4 py-2 text-left text-sm`}
                                  onClick={logout}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/login"
                                className={`${
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Login
                              </a>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
