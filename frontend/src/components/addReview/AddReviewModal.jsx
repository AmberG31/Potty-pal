import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ModalContext } from '../../context/ModalContext';
import { AuthContext } from '../../context/AuthContext';

function AddReviewModal({ setIsModal, refresh, setRefresh, toiletId }) {
  const contentRef = useRef();
  const cleanlinessRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);

  const validInputChecker = ({ content, clean }) => {
    const isValid = content !== '' && clean !== '';
    if (!isValid) {
      setMessage(
        content === '' ? 'Please write a review' : 'Please select rating'
      );
      setIsInvalid(true);
    }
    return isValid;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsInvalid(false);
    const body = {
      content: contentRef.current.value,
      clean: cleanlinessRef.current.value,
    };
    if (!validInputChecker(body)) {
      return;
    }
    try {
      const response = await axios.post(`/toilets/${toiletId}/review`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setRefresh(!refresh);
      pushModal({
        message: response.data.message,
        type: 'success',
      });
      contentRef.current.value = '';
      cleanlinessRef.current.value = '';
      setIsModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      data-cy="reviewModal"
      className="fixed left-0 top-0 z-10 flex h-[100vh] w-full items-center  justify-center bg-black bg-opacity-50"
    >
      <form
        onSubmit={submitHandler}
        className="mx-2 flex w-full flex-col justify-between gap-6 border-2 bg-white p-8 lg:min-h-[40vh] xl:w-[40vw]"
      >
        <h2 className="my-2 text-3xl font-bold">Add a review</h2>
        <textarea
          ref={contentRef}
          className="flex-1 border p-2"
          placeholder="leave a review"
        />
        <div>
          <h3 className="my-2 text-2xl font-bold">Rating</h3>
          <label htmlFor="cleanliness">
            Cleanliness :
            <select
              id="cleanliness"
              ref={cleanlinessRef}
              defaultValue=""
              className="border p-1"
            >
              <option value="" disabled>
                Select rate
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <p className="mt-4 text-gray-400">
            Description of ratings: 1-Terrible, 2- Poor, 3-Average, 4-Very good,
            5-Exellent
          </p>
        </div>
        {isInvalid && (
          <p className="rounded-lg border border-red-300 bg-red-100 p-4 text-red-600">
            {message}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <button type="submit" className="border border-slate-500 p-2">
            Submit
          </button>
          <button
            type="button"
            className="border border-slate-500 p-2"
            onClick={() => setIsModal(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

AddReviewModal.propTypes = {
  setIsModal: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
  toiletId: PropTypes.string.isRequired,
};

export default AddReviewModal;
