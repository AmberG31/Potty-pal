import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ApiUrlContext } from '../../context/ApiUrlContext';

function SignUpForm() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { tokenHandler } = useContext(AuthContext);
  const { url } = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/users`, {
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      tokenHandler(response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error.response.data.message);
      emailRef.current.value = '';
      usernameRef.current.value = '';
      passwordRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-10 ">
      <div className=" w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="mt-4 py-4 text-center">
          <img src="/mini-logo.svg" alt="logo" className="mx-auto h-16 w-16" />
          <h2 className="mt-2 text-2xl font-bold">Signup</h2>
        </div>
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block font-bold text-gray-700"
              >
                Email
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="email"
                  required
                  className="form-input w-full rounded-lg border border-gray-400 px-4 py-2 focus:outline-none"
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="mb-2 block font-bold text-gray-700"
              >
                Username
                <input
                  type="text"
                  id="username"
                  ref={usernameRef}
                  autoComplete="username"
                  required
                  className="form-input w-full rounded-lg border border-gray-400 px-4 py-2 focus:outline-none"
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block font-bold text-gray-700"
              >
                Password
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  required
                  className="form-input w-full rounded-lg border border-gray-400 px-4 py-2 focus:outline-none"
                />
              </label>
            </div>
            <button
              className="mb-2 w-full rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-orange-500 disabled:bg-gray-500"
              type="submit"
              id="submit-signup"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
