import React from 'react';
import PropTypes from 'prop-types';
import Toilet, { toiletPropTypes } from '../toilet/Toilet';

function ToiletList({ toilets }) {
  return (
    <div className="">
      <div id="toilet-list" className="flex flex-col gap-y-6">
        {toilets.map((toilet) => (
          <Toilet key={toilet._id} toilet={toilet} />
        ))}
      </div>
    </div>
  );
}

ToiletList.propTypes = {
  toilets: PropTypes.arrayOf(toiletPropTypes).isRequired,
};

export default ToiletList;
