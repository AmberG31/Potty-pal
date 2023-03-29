import React, { useState, useEffect } from "react";
import Toilet from "../toilet/Toilet";

const ToiletList = () => {
  const [toilets, setToilets] = useState([]);

  const getToilets = async () => {
    const response = await fetch("/toilets");

    if (response.status !== 200) {
      throw new Error("Cannot fetch the data");
    } else {
      const data = await response.json();
      setToilets(data.toilets);
    }
  };

  useEffect(() => {
    getToilets();
  }, []);

  return (
    <>
      {/* Create the body of the Toilet List which will return a Toilet Component */}
      <div>
        <h1>Hello</h1>
        {toilets.map((toilet) => (
          <Toilet toilet={toilet} />
        ))}
      </div>
    </>
  );
};

export default ToiletList;
