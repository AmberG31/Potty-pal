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

export const toiletPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  accessible: PropTypes.bool,
  babyChanging: PropTypes.bool,
  price: PropTypes.shape({
    $numberDecimal: PropTypes.string,
  }),
  addedBy: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
  }),
  address: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    postcode: PropTypes.string,
    __v: PropTypes.number,
  }),
  reviews: PropTypes.arrayOf(PropTypes.shape({})),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  __v: PropTypes.number,
});

Toilet.propTypes = { toilet: toiletPropTypes.isRequired };

export default Toilet;
