import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { ModalContext } from '../../context/ModalContext';
import { AuthContext } from '../../context/AuthContext';
import { ApiUrlContext } from '../../context/ApiUrlContext';

function AddReviewModal({ setIsModal, refresh, setRefresh, toiletId }) {
  const contentRef = useRef();
  const cleanlinessRef = useRef();
  const availabilityRef = useRef();
  const aestheticsRef = useRef();
  const comfortRef = useRef();
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
      comfort: comfortRef.current.value,
      availability: availabilityRef.current.value,
      aesthetics: aestheticsRef.current.value,
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
      comfortRef.current.value = '';
      availabilityRef.current.value = '';
      aestheticsRef.current.value = '';
      setIsModal(false);
    } catch (error) {
      pushModal({
        message: error.response.data.message,
        type: 'error',
      });
    }
  };

  return (
    <div
      data-cy="reviewModal"
      className="fixed left-0 top-0 z-50 flex h-[100vh] w-full items-center  justify-center bg-black bg-opacity-50"
    >
      <form
        onSubmit={submitHandler}
        className="mx-2 flex w-full flex-col justify-between gap-6 rounded-lg border-2 bg-white p-4 lg:p-10 xl:w-[1000px]"
      >
        <div className="col-span-full">
          <h2 className="my-2 mb-8 text-3xl font-bold">Add a review</h2>
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
          <p className="text-sm leading-6 text-gray-600">
            Description of ratings: 1 - Terrible, 2 - Poor, 3 - Average, 4 -
            Very good, 5 - Exellent
          </p>
          <div className="mb-4 mt-4 grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
            <SelectInput name="cleanliness" reference={cleanlinessRef} />
            <SelectInput name="availability" reference={availabilityRef} />
            <SelectInput name="aesthetics" reference={aestheticsRef} />
            <SelectInput name="comfort" reference={comfortRef} />
          </div>

          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 p-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>Explanation</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="grid grid-cols-2 gap-4 px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Cleanliness</h4>
                    <p>
                      This category would take into account the overall
                      cleanliness of the toilet, including the bowl, seat, and
                      surrounding areas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Availability</h4>
                    <p>
                      This category would consider the availability of toilets
                      in a public space, including the number of available
                      toilets and their proximity to users.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Aesthetics</h4>
                    <p>
                      This category would evaluate the aesthetics of the toilet,
                      including its color, shape, and style.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Comfort</h4>
                    <p>
                      This category would consider how comfortable the toilet is
                      to sit on, including factors such as seat shape, size, and
                      padding.
                    </p>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        {isInvalid && (
          <p className="rounded-lg border border-red-300 bg-red-100 p-4 text-red-600">
            {message}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <button type="submit" className="btn p-3">
            Submit
          </button>
          <button
            type="button"
            className="btn-outline mt-2 p-3"
            onClick={() => setIsModal(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

function SelectInput({ name, reference }) {
  const tag = name.split(' ').join('-');
  return (
    <label
      htmlFor={tag}
      className="block text-sm font-medium capitalize leading-6 text-gray-900"
    >
      {name}
      <select
        id={tag}
        ref={reference}
        defaultValue=""
        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 md:ml-6"
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
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  reference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

AddReviewModal.propTypes = {
  setIsModal: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
  toiletId: PropTypes.string.isRequired,
};

export default AddReviewModal;
