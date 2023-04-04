import axios from 'axios';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import ToiletList from '../components/toiletList/ToiletList';
import { ApiUrlContext } from '../context/ApiUrlContext';

function Home() {
  const [toilets, setToilets] = useState([]);
  const navigate = useNavigate();
  const { url } = useContext(ApiUrlContext);

  const getToilets = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/toilets`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch toilets');
      } else {
        setToilets(response.data.toilets);
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }, [navigate]);

  useEffect(() => {
    getToilets();
  }, [getToilets]);

  return <ToiletList toilets={toilets} />;
}

export default Home;
