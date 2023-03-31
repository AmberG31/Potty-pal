import React, { useState } from 'react';

function ImageUploader() {
  const [images, setImages] = useState([]);

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

  const onChangeHandler = async (event) => {
    const array = [];
    await Object.values(event.target.files).forEach(async (value) => {
      const newImage = await convertTo64(value);
      array.push(newImage);
      setImages((prev) => [...prev, newImage]);
    });
  };

  return (
    <div>
      <input type="file" onChange={onChangeHandler} multiple />
      {
        images.map((image) => <img src={image} alt="photos" />)
      }
    </div>
  );
}

export default ImageUploader;
