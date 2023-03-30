import React from 'react';
import PropTypes from 'prop-types';
import Toilet from '../toilet/Toilet';

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
  toilets: PropTypes.objectOf({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
};

export default ToiletList;
