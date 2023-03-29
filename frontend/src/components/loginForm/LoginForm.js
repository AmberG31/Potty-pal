import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = ({ redirect }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
    } else {
      throw new Error(data.message);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <button
          className="bg-blue-600 text-white hover:bg-blue-500 w-full rounded-lg p-2 text-sm font-bold transition-all disabled:bg-gray-500"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
