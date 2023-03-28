import React, { useRef } from "react";

const AddReviewModal = ({ setIsModal }) => {
  const contentRef = useRef();
  const cleanlinessRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log({
      content: contentRef.current.value,
      cleanliness: cleanlinessRef.current.value,
    });
    contentRef.current.value = "";
    cleanlinessRef.current.value = "";
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 my-6 border-2 p-8"
      >
        <h2 className="text-3xl font-bold my-2">Add a review</h2>
        <input
          ref={contentRef}
          type="text"
          className="border p-2"
          placeholder="leave a review"
        />
        <div>
          <label htmlFor="cleanliness">Cleanliness:</label>
          <select
            id="cleanliness"
            ref={cleanlinessRef}
            defaultValue=""
            className="border p-1"
          >
            <option value="" disabled>
              Please rate
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
        </div>
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
      </form>
    </>
  );
};

export default AddReviewModal;
