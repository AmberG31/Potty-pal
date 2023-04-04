import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ModalContext } from '../../context/ModalContext';
import { AuthContext } from '../../context/AuthContext';
import { ApiUrlContext } from '../../context/ApiUrlContext';

function AddReviewModal({ setIsModal, refresh, setRefresh, toiletId }) {
  const contentRef = useRef();
  const cleanlinessRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);
  const { url } = useContext(ApiUrlContext);

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
      const response = await axios.post(
        `${url}/toilets/${toiletId}/review`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      className="fixed left-0 top-0 z-50 flex h-[100vh] w-full items-center  justify-center bg-black bg-opacity-50"
    >
      <form
        onSubmit={submitHandler}
        className="mx-2 flex w-full flex-col justify-between gap-6 border-2 bg-white p-8 lg:min-h-[40vh] xl:w-[40vw]"
      >
        <div className="col-span-full">
          <h2 className="my-2 text-3xl font-bold">Add a review</h2>
          <label
            htmlFor="content"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <div className="mt-2">
              <textarea
                id="content"
                name="content"
                ref={contentRef}
                placeholder="leave a review"
                rows="5"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about your experience.
            </p>
          </label>
        </div>
        <div>
          <h3 className="my-2 text-2xl font-bold">Rating</h3>
          <p className="mb-3 text-sm leading-6 text-gray-600">
            Description of ratings: 1 - Terrible, 2 - Poor, 3 - Average, 4 -
            Very good, 5 - Exellent
          </p>
          <label
            htmlFor="cleanliness"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cleanliness
            <select
              id="cleanliness"
              ref={cleanlinessRef}
              defaultValue=""
              className="ml-6 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
