import React from 'react';
import PropTypes from 'prop-types';
import Toilet, { toiletPropTypes } from '../toilet/Toilet';

function ToiletList({ toilets }) {
  return (
    <div className="py-2">
      {toilets.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">No toilets found</h2>
          <p className="text-gray-500">Please try again later</p>
        </div>
      ) : (
        <div id="toilet-list" className="flex flex-col gap-y-1">
          {toilets.map((toilet) => (
            <Toilet key={toilet._id} toilet={toilet} />
          ))}
        </div>
      )}
    </div>
  );
}

ToiletList.propTypes = {
  toilets: PropTypes.arrayOf(toiletPropTypes).isRequired,
};

export default ToiletList;
