import React from "react";
import Toilet from "../toilet/Toilet";

const ToiletList = ({ toilets }) => {
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
