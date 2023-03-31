import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpOnSquareIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

function ImageUploader({ images, setImages }) {
  const fileInputRef = useRef();

  const onClickHandler = () => {
    fileInputRef.current.click();
  };

  const convertTo64 = async (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const uploadHandler = async (event) => {
    const { files } = event.target;
    if (files.length !== 0) {
      setImages([]);
      await Object.values(files).forEach(async (value) => {
        const newImage = await convertTo64(value);
        setImages((prev) => [...prev, newImage]);
      });
    }
  };

  const addImageHandler = async (event) => {
    const { files } = event.target;
    if (files.length !== 0) {
      await Object.values(files).forEach(async (value) => {
        const newImage = await convertTo64(value);
        setImages((prev) => [...prev, newImage]);
      });
    }
  };

  const deleteImage = (image64code) => {
    setImages((prev) => prev.filter((image) => image !== image64code));
  };

  return (
    <>
      <h2 className="text-md font-semibold">Photos</h2>
      <div className="border-2 p-6">
        { images.length === 0 ? (
          <button type="button" onClick={onClickHandler} className=" flex justify-center items-center gap-2 w-full p-3 rounded-md bg-blue-600 text-white">
            <ArrowUpOnSquareIcon className="w-6" />
            {' '}
            Upload Photos
          </button>
        ) : (
          <div className="flex gap-4 items-center mb-6">
            <button type="button" onClick={onClickHandler} className=" flex justify-center items-center gap-2 w-full p-3 rounded-md border-blue-600 border-2 text-blue-600">
              <PlusCircleIcon className="w-6" />
              {' '}
              Add More
            </button>
            <button type="button" onClick={() => setImages([])} className=" flex justify-center items-center gap-2 w-full p-3 rounded-md border-2 border-red-500 text-red-500">
              <XCircleIcon className="w-6 text-red-500" />
              {' '}
              Clear All
            </button>
          </div>
        )}
        <div>
          <input type="file" ref={fileInputRef} onChange={images.length === 0 ? uploadHandler : addImageHandler} accept=".png, .jpg, .jpeg, .svg" multiple className="hidden" />
          { images.length !== 0 && (
          <div className="my-4 flex gap-2 items-center">
            <h3 className="font-bold">Preivews</h3>
            <p className="text-gray-500 text-sm">
              {images.length}
              {' '}
              photos
            </p>
          </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {
          images.map((image) => (
            <div className="relative max-h-52 border-2 rounded-lg overflow-hidden" key={crypto.randomUUID()}>
              <XCircleIcon className="absolute right-2 top-2 w-6 text-red-500 cursor-pointer" onClick={() => deleteImage(image)} />
              <img src={image} alt="photos" className="object-cover" />
            </div>
          ))
      }
          </div>
        </div>
      </div>
    </>
  );
}

ImageUploader.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  setImages: PropTypes.func
};

ImageUploader.defaultProps = {
  images: [],
  setImages: () => {}
};

export default ImageUploader;
