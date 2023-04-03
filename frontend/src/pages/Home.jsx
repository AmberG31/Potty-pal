import axios from 'axios';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import ToiletList from '../components/toiletList/ToiletList';

function Home() {
  const [toilets, setToilets] = useState([]);
  const { token, tokenHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const getToilets = useCallback(async () => {
    if (token === undefined || token === null) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get('/toilets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch toilets');
      } else {
        tokenHandler(response.data.token);
        setToilets(response.data.toilets);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }, [token, tokenHandler, navigate]);

  useEffect(() => {
    getToilets();
  }, [getToilets]);

  return <ToiletList toilets={toilets} />;
}

export default Home;
