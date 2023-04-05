import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/map/Map';
import Sidebar from '../components/sidebar/Sidebar';
import { ApiUrlContext } from '../context/ApiUrlContext';

function Home() {
  const [toilets, setToilets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(ApiUrlContext);

  const getToilets = async () => {
    setIsLoading(true);
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

export default Home;
