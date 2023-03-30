import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { tokenHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/tokens", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      tokenHandler(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          autocomplete
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          autocomplete
          required
        />
        <button
          className="w-full rounded-lg bg-blue-600 p-2 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:bg-gray-500"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
