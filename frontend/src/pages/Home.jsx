import axios from 'axios';
import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToiletList from '../components/toiletList/ToiletList';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const [toilets, setToilets] = useState([]);
  const { token, tokenHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const getToilets = useCallback(async () => {
    if (token === 'undefined' || token === null) {
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
        tokenHandler(response.data.newToken);
        setToilets(response.data.toilets);
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, token, tokenHandler]);

  useEffect(() => {
    getToilets();
  }, [getToilets]);

  return (
    <div>
      <h1 className="my-6 text-3xl font-bold">Home</h1>
      <Link to="/toilet/1">
        <div className="my-3 border p-2 text-center">Toilet page</div>
      </Link>
      <hr />
      {/* <ToiletList /> */}
      <ToiletList toilets={toilets} />
    </div>
  );
}

export default Home;
