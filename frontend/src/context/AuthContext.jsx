import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ApiUrlContext } from './ApiUrlContext';
import { ModalContext } from './ModalContext';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const { pushModal } = useContext(ModalContext);
  const { url } = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const tokenHandler = (tokenInput) => {
    window.localStorage.setItem('token', tokenInput);
    setToken(tokenInput);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    pushModal({
      type: 'success',
      message: "You've been logged out.",
    });
    navigate('/');
  };

  const getUser = useCallback(async () => {
    if (token === 'undefined' || token === null) {
      window.localStorage.removeItem('token');
      return;
    }

    try {
      const response = await axios.get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      tokenHandler(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response.data.message);
      window.localStorage.clear('token');
      setUser(undefined);
    }
  }, [token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const context = useMemo(
    () => ({ token, user, tokenHandler, logout }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
