import React, { useState } from 'react';
import Image from 'next/image';
const ImageUpload = ({ onImageSave }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && caption) {
        const savedImages = JSON.parse(localStorage.getItem('images')) || [];
        savedImages.push({ image: preview, caption });
        localStorage.setItem('images', JSON.stringify(savedImages));

        // Notify parent component
        onImageSave();

        // Clear the form
        setImage(null);
        setCaption('');
        setPreview('');
    }
};


  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-body font-semibold mb-4">upload and submit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm font-body text-gray-500 file:text-white file:uppercase file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-500 hover:file:bg-pink-600"
          />
        </div>
        {preview && (
          <div className="mb-4">
            <Image src={preview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        )}
        <div>
          <input
            type="text"
            value={caption}
            onChange={handleCaptionChange}
            className="w-full font-body px-4 py-2 border rounded-lg"
            placeholder="Enter Note here"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-500 uppercase font-body font-bold text-white py-2 px-4 rounded-lg hover:bg-pink-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
