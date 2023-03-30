import React from "react";
import Toilet from "../toilet/Toilet";

const ToiletList = ({ toilets }) => {
  return (
    <div className="">
      <div id="toilet-list" className="flex flex-col gap-y-6">
        {toilets.map((toilet) => (
          <Toilet key={toilet._id} toilet={toilet} />
        ))}
      </div>
    </div>
  );
};

export default ToiletList;
