import React from 'react';
import PropTypes from 'prop-types';
import Toilet, { toiletPropTypes } from '../toilet/Toilet';

function ToiletList({ toilets }) {
  return (
    <div className="flex flex-col gap-2">
      <div id="toilet-list">
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
