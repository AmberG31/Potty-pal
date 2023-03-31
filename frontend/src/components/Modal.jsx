import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

function Modal({ message, type, remove }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveItem = useCallback(() => {
    remove();
    setIsFadingOut(false);
  }, [remove]);

  useEffect(() => {
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(handleRemoveItem, 500);
    }, 3000);
  }, [handleRemoveItem]);

  return (
    <div
      className={`
        ${
          type === 'success'
            ? 'border-green-400 bg-green-50 text-green-600'
            : 'border-red-400 bg-red-50 text-red-600'
        } 
        ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'} 
        z-50 mx-auto w-full rounded-lg border bg-opacity-95 p-4 text-sm lg:max-w-[40vw]
      `}
      data-cy="modal"
    >
      {message}
    </div>
  );
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Modal;
