import React from "react";

const Toilet = ({ toilet }) => {
  return (
    <>
      {/* All of the toilet information should be rendered here */}
      <div className="flex gap-x-4 rounded-md bg-gray-50 p-6 shadow-md">
        <div id="toilet-photo">
          <img
            src="https://picsum.photos/500/500"
            alt="toilet"
            className="h-20 w-20 rounded-md"
          />
        </div>
        <div id="toilet-info">
          <p className="text-2xl font-bold capitalize">{toilet.name}</p>
          <div className="flex gap-x-2">
            <div className="flex gap-x-2">
              <p className=" font-semibold">Accessible: </p>
              <p className="">{toilet.accessible ? "Yes" : "No"}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="font-semibold">Baby Changing: </p>
              <p className="">{toilet.babyChanging ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <p className="font-semibold">Price: </p>
            <p className="">£ {toilet.price.$numberDecimal}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toilet;
