// components/PropertyForm.js
import React, { useState } from 'react';

const PropertyForm = ({ onClose }) => {
  const [propertyDetails, setPropertyDetails] = useState({
    name: '',
    bedrooms: '',
    bathrooms: '',
    parking: false,
    petFriendly: false,
    price: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(propertyDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-heading">Add Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-body">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Property Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={propertyDetails.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 font-body">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={propertyDetails.bedrooms}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 font-body">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={propertyDetails.bathrooms}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 font-body flex items-center">
            <input
              id="parking"
              name="parking"
              type="checkbox"
              checked={propertyDetails.parking}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="parking" className="text-gray-700 text-sm font-bold">Has Parking</label>
          </div>
          <div className="mb-4 font-body flex items-center">
            <input
              id="petFriendly"
              name="petFriendly"
              type="checkbox"
              checked={propertyDetails.petFriendly}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="petFriendly" className="text-gray-700 text-sm font-bold">Pet Friendly</label>
          </div>
          <div className="mb-4 font-body">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={propertyDetails.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-pink-500 font-bold font-body text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-600"
            >
              SUBMIT
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-pink-500 font-bold font-body text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-pink-600"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
