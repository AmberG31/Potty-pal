import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const tokenHandler = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
  };

  const getUser = useCallback(async () => {
    if (token === undefined || token === null) {
      window.localStorage.clear("token");
      return;
    }
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      tokenHandler(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response.data.message);
      window.localStorage.clear("token");
      setUser(undefined);
    }
  }, [token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const context = useMemo(() => ({ token, user, tokenHandler }), [token, user]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
