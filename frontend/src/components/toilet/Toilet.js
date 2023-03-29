import React from "react";

const Toilet = ({ toilet }) => {
  return (
    <>
      {/* All of the toilet information should be rendered here */}
      <div>
        <p>{toilet.name}</p>
      </div>
    </>
  );
};

export default Toilet;
