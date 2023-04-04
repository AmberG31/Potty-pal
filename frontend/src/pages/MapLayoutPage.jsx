import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map from '../components/map/Map';
import Sidebar from '../components/sidebar/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { ApiUrlContext } from '../context/ApiUrlContext';

function MapLayoutPage() {
  const [toilets, setToilets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, tokenHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const { url } = useContext(ApiUrlContext);

  const getToilets = async () => {
    if (token === undefined || token === null) {
      navigate('/login');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/toilets`, {
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
    setIsLoading(false);
  };

  useEffect(() => {
    getToilets();
  }, []);

  return (
    <div className="flex h-full flex-1">
      <Sidebar isLoading={isLoading} toilets={toilets} />
      <div className="flex-1">
        <Map />
      </div>
    </div>
  );
}

export default MapLayoutPage;
