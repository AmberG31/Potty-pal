import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { tokenHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users", {
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      tokenHandler(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      emailRef.current.value = "";
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={emailRef} required />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameRef} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} required />
        <button
          className="w-full rounded-lg bg-blue-600 p-2 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:bg-gray-500"
          type="submit"
          id="submit-signup"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
