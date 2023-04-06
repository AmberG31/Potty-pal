/* eslint-disable react/jsx-one-expression-per-line */
import React, { Fragment } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { logout, token, user } = React.useContext(AuthContext);

  return (
    <div className="z-0 flex h-full w-full border border-b bg-white p-6">
      <div className="flex w-full items-center justify-between gap-4 sm:justify-between md:gap-10">
        {/* Logo */}
        <div id="branding" className="max-w-fit shrink">
          <Link to="/">
            <div className="flex gap-4">
              <div className="">
                <img className="w-12 lg:w-16" src="/mini-logo.svg" alt="" />
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
        <div
          id="menu-buttons"
          className="col-span-4 flex justify-center gap-3 sm:col-span-1 lg:justify-end"
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                            >
                              View Map
                            </Link>
                          )}
                        </Menu.Item>
                        {token && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/toilets/add"
                                className={`${
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Add New Toilet
                              </Link>
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {token ? (
                          <>
                            <Menu.Item>
                              {() => (
                                <div className="flex items-center gap-x-2 border-b px-4 py-3">
                                  <img
                                    src={`https://robohash.org/${user._id}`}
                                    alt="profile-pic"
                                    className="w-10 rounded-full border"
                                  />
                                  <p className="text-sm">
                                    Log in as{' '}
                                    <span className="ml-1 text-base font-bold capitalize">
                                      {user.username}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  className={`${
                                    active
                                      ? 'bg-red-100 text-red-900'
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
                              <Link
                                to="/login"
                                className={`${
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Login
                              </Link>
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
