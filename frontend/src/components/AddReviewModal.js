import React, { useRef } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0NGE4MmRmZDA3YmVhMTZmYWFjYTAiLCJpYXQiOjE2ODAxMDA2OTgsImV4cCI6MTY4MDEwNDI5OH0.us6-Y5KvQGWi_NfAEhLVj3cSZ3NOeHA901AJGj6Hg8c";

const AddReviewModal = ({ setIsModal }) => {
  const contentRef = useRef();
  const cleanlinessRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const body = {
      content: contentRef.current.value,
      clean: cleanlinessRef.current.value,
    };
    try {
      const response = await fetch(
        `http://localhost:8080/toilets/64244d5a0a270cf092bc2890/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      contentRef.current.value = "";
      cleanlinessRef.current.value = "";
      setIsModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      data-cy="reviewModal"
      className="fixed top-0 left-0 bg-black bg-opacity-50 h-[100vh] w-full flex  justify-center items-center z-10"
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 border-2 p-8 mx-2 bg-white w-full xl:w-[40vw] lg:min-h-[40vh] justify-between"
      >
        <h2 className="text-3xl font-bold my-2">Add a review</h2>
        <textarea
          ref={contentRef}
          className="border p-2 flex-1"
          placeholder="leave a review"
        />
        <div>
          <h3 className="text-2xl font-bold my-2">Rating</h3>
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
          <p className="mt-4 text-gray-400">
            Description of ratings: 1-Terrible, 2- Poor, 3-Average, 4-Very good,
            5-Exellent
          </p>
        </div>
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
};

export default AddReviewModal;
