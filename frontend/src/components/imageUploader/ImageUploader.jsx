/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  PlusCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const convertTo64 = async (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
function ImageUploader({ images, setImages, fileSizeCalculator }) {
  const fileInputRef = useRef();

  const onClickHandler = () => {
    fileInputRef.current.click();
  };

  const uploadHandler = async (event) => {
    const { files } = event.target;
    if (files.length !== 0) {
      setImages([]);
      await Object.values(files).forEach(async (value) => {
        const newImage = await convertTo64(value);
        setImages((prev) => [...prev, { size: value.size, image: newImage }]);
      });
    }
  };

  const addImageHandler = async (event) => {
    const { files } = event.target;
    if (files.length !== 0) {
      await Object.values(files).forEach(async (value) => {
        const newImage = await convertTo64(value);
        setImages((prev) => [...prev, { size: value.size, image: newImage }]);
      });
    }
  };

  const deleteImageHandler = (image64code) => {
    setImages((prev) => prev.filter(({ image }) => image !== image64code));
  };

  return (
    <div className="my-3">
      <h2 className="text-md font-semibold">Photos</h2>
      <div className="mt-3 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        {images.length === 0 ? (
          <UploadFrame handler={onClickHandler} />
        ) : (
          <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
            <button
              type="button"
              onClick={onClickHandler}
              className=" flex w-full items-center justify-center gap-2 rounded-md border-2 border-blue-600 p-3 text-blue-600"
            >
              <PlusCircleIcon className="w-6" /> Add More
            </button>
            <button
              type="button"
              onClick={() => setImages([])}
              className=" flex w-full items-center justify-center gap-2 rounded-md border-2 border-red-500 p-3 text-red-500"
            >
              <XCircleIcon className="w-6 text-red-500" /> Clear All
            </button>
          </div>
        )}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={images.length === 0 ? uploadHandler : addImageHandler}
            accept=".png, .jpg, .jpeg, .svg"
            multiple
            className="hidden"
          />
          {images.length !== 0 && (
            <>
              <div className="my-4 flex items-center gap-2">
                <h3 className="font-bold">Preivews</h3>
                <p className="text-sm text-gray-500">
                  {images.length} photos
                  {' - '}
                  <span>{fileSizeCalculator().toFixed(2)} MB in total</span>
                </p>
              </div>
              {fileSizeCalculator() > 5 && (
                <p className="my-4 border border-red-300 bg-red-100 p-4 text-red-600">
                  The total of image size cannot exceed 5MB
                </p>
              )}
            </>
          )}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {images.map(({ image, size }) => (
              <div
                className="relative h-52 overflow-hidden rounded-lg border-2"
                key={crypto.randomUUID()}
              >
                <XMarkIcon
                  className="absolute right-2 top-2 w-6 cursor-pointer bg-red-500 bg-opacity-90 p-1 text-white"
                  onClick={() => deleteImageHandler(image)}
                />
                <img src={image} alt="photos" className="object-cover" />
                <div className="absolute bottom-0 bg-white bg-opacity-90 p-2 text-sm italic text-gray-600">
                  File size:{' '}
                  {(size / 1024).toFixed(2) > 1024
                    ? `${(size / 1024 / 1024).toFixed(2)} MB`
                    : `${(size / 1024).toFixed(2)} KB`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadFrame({ handler }) {
  return (
    <div className="col-span-full">
      <div className="mt-2 flex justify-center rounded-lg border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <button
              type="button"
              onClick={handler}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              Upload a file
            </button>
            <p className="pl-1">or multiple files</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, JPEG, SVG up to 5MB
          </p>
        </div>
      </div>
    </div>
  );
}

ImageUploader.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      size: PropTypes.number,
    })
  ),
  setImages: PropTypes.func,
  fileSizeCalculator: PropTypes.func.isRequired,
};

ImageUploader.defaultProps = {
  images: [],
  setImages: () => {},
};

UploadFrame.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default ImageUploader;
