import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ApiUrlContext } from '../../context/ApiUrlContext';

function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { tokenHandler } = useContext(AuthContext);
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
      navigate('/');
    } catch (error) {
      console.log(error.response.data.message);
      usernameRef.current.value = '';
      passwordRef.current.value = '';
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            ref={usernameRef}
            autoComplete="username"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            ref={passwordRef}
            autoComplete="current-password"
            required
          />
        </label>
        <button
          className="w-full rounded-lg bg-blue-600 p-2 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:bg-gray-500"
          type="submit"
          id="submit-login"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
