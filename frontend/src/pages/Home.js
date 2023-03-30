import axios from "axios";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ToiletList from "../components/toiletList/ToiletList";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [toilets, setToilets] = useState([]);
  const { token, tokenHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const getToilets = useCallback(async () => {
    if (token === "undefined") {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("/toilets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch toilets");
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
    <>
      <h1>Home page</h1>
      <ToiletList toilets={toilets} />
    </>
  );
};

export default Home;
