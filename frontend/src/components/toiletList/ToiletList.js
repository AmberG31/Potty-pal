import React, { useState, useContext, useEffect } from "react";
import Toilet from "../toilet/Toilet";
import { AuthContext } from "../../context/AuthContext";

const ToiletList = () => {
  const [toilets, setToilets] = useState([]);
  const { token, setToken } = useContext(AuthContext);

  const getToilets = async () => {
    if (token) {
      const response = await fetch("/toilets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch toilets");
      } else {
        const data = await response.json();
        setToilets(data.toilets);
        setToken(data.token);
      }
    }
  };

  useEffect(() => {
    getToilets();
  });

  return (
    <div className="flex flex-col gap-2">
      <div id="toilet-list">
        {toilets.map((toilet) => (
          <Toilet key={toilet._id} toilet={toilet} />
        ))}
      </div>
    </div>
  );
};

export default ToiletList;
