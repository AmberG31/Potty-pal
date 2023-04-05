import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { ModalContext } from '../../context/ModalContext';

function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { tokenHandler } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);
  const { url } = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/tokens`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      tokenHandler(response.data.token);
      pushModal({
        type: 'success',
        message: `Welcome back, ${response.data.user.username}!`,
      });
      navigate('/');
    } catch (error) {
      pushModal({
        type: 'error',
        message: error.response.data.message,
      });
      usernameRef.current.value = '';
      passwordRef.current.value = '';
    }
  };

  return (
    <div className="relative flex h-[100vh] items-center justify-center px-4 py-10">
      <img
        src="/bg.jpeg"
        alt="background"
        className="fixed -z-10 h-full w-full object-cover opacity-60"
      />
      <div className=" w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="mt-4 flex flex-col items-center py-4 text-center">
          <Link to="/">
            <img
              src="/mini-logo.svg"
              alt="logo"
              className="mx-auto h-16 w-16"
            />
          </Link>
          <h2 className="mt-2 text-3xl font-bold">Log in</h2>
        </div>
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
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
            <div className="mb-10">
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
              className="btn mb-4 w-full transition-all hover:bg-orange-500  disabled:bg-gray-500"
              type="submit"
              id="submit-login"
            >
              Login
            </button>
          </form>
          <p className="py-1 text-center text-sm text-gray-600">
            <span>or </span>
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-primary"
            >
              create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
