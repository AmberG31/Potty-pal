/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ArrowUpOnSquareIcon,
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
    <>
      <h2 className="text-md font-semibold">
        Photos{' '}
        <span className="text-sm font-light">
          {'(File size in total must be < 5MB)'}
        </span>
      </h2>
      <div className="border-2 p-6">
        {images.length === 0 ? (
          <button
            type="button"
            onClick={onClickHandler}
            className=" flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 p-3 text-white"
          >
            <ArrowUpOnSquareIcon className="w-6" /> Upload Photos
          </button>
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
    </>
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

export default ImageUploader;
