import React from 'react';
import PropTypes from 'prop-types';

function Toilet({ toilet }) {
  return (
    <>
      {/* All of the toilet information should be rendered here */}
      <div>
        <p>{toilet.name}</p>
      </div>
    </>
  );
}

Toilet.propTypes = {
  toilet: PropTypes.objectOf({
    name: PropTypes.string,
  }).isRequired,
};

export default Toilet;
