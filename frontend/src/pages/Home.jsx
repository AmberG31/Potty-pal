/* eslint-disable implicit-arrow-linebreak */
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/map/Map';
import Sidebar from '../components/sidebar/Sidebar';
import { ApiUrlContext } from '../context/ApiUrlContext';
import Filters from '../components/sidebar/Filters';

function Home() {
  const [toilets, setToilets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(ApiUrlContext);

  const [isBabyChanging, setIsBabyChanging] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);
  const [isUnisex, setIsUnisex] = useState(false);
  const [isFree, setIsFree] = useState(false);

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

  const dataFilter = (toiletData) => {
    let data = toiletData;

    if (isBabyChanging) {
      data = data.filter((toilet) => toilet.babyChanging);
    }

    if (isAccessible) {
      data = data.filter((toilet) => toilet.accessible);
    }

    if (isUnisex) {
      data = data.filter((toilet) => toilet.unisex);
    }

    if (isFree) {
      data = data.filter((toilet) => toilet.price === null);
    }

    return data;
  };

  return (
    <div className="flex h-full flex-1 flex-col-reverse lg:flex-row">
      <Sidebar isLoading={isLoading} toilets={dataFilter(toilets)}>
        <Filters
          setIsBabyChanging={setIsBabyChanging}
          setIsAccessible={setIsAccessible}
          setIsUnisex={setIsUnisex}
          setIsFree={setIsFree}
        />
      </Sidebar>
      <div className="flex-1">
        <Map toilets={dataFilter(toilets)} />
      </div>
    </div>
  );
}

export default Home;
