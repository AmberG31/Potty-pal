import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const tokenHandler = (tokenInput) => {
    window.localStorage.setItem('token', tokenInput);
    setToken(tokenInput);
  };

  const getUser = useCallback(async () => {
    if (token === 'undefined' || token === 'null') {
      return;
    }
    try {
      const response = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      tokenHandler(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response.data.message);
      tokenHandler(undefined);
      setUser(undefined);
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const context = useMemo(() => ({ token, user, tokenHandler }), [token, user]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
