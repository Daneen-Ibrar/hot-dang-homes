import React, { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';

const SellYourPropertyPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    parking: '',
    pets: false,
    image: null,
  });

  // Function to get the current user's properties from localStorage
  const loadProperties = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get the current user from localStorage
    if (user) {
      const userProperties = JSON.parse(localStorage.getItem(`${user.username}_properties`)) || [];
      setProperties(userProperties);
    }
  };

  // Load properties on component mount
  useEffect(() => {
    loadProperties();
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Get the current user
    if (user && properties.length > 0) {
      localStorage.setItem(`${user.username}_properties`, JSON.stringify(properties));
    }
  }, [properties]);

  const handleAddProperty = () => {
    setFormData({
      name: '',
      bedrooms: '',
      bathrooms: '',
      price: '',
      parking: '',
      pets: false,
      image: null,
    });
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleEditProperty = (index) => {
    const property = properties[index];
    setFormData({ ...property });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteProperty = (index) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const updatedProperties = properties.filter((_, i) => i !== index);
      setProperties(updatedProperties);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProperties = [...properties];
    const propertyData = { ...formData };

    if (editingIndex !== null) {
      updatedProperties[editingIndex] = propertyData;
    } else {
      updatedProperties.push(propertyData);
    }

    setProperties(updatedProperties);
    handleCloseForm();
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 max-w-screen-lg flex-grow">
        <h1 className="font-heading text-5xl mt-8">Sell Your Property</h1>
        <button
          className="bg-pink-500 font-bold font-body text-white px-4 py-2 mt-6 rounded hover:bg-pink-600 flex items-center justify-center"
          onClick={handleAddProperty}
        >
          <FaPlus className="mr-2" /> ADD PROPERTY
        </button>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl mb-4 font-heading">{editingIndex !== null ? 'Edit Property' : 'Add Property'}</h2>
              <form className='font-body' onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Property Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
                    Bedrooms
                  </label>
                  <input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
                    Bathrooms
                  </label>
                  <input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Upload Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="shadow font-body appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-pink-500 font-body font-bold hover:bg-pink-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 font-body font-bold hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleCloseForm}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-8 w-full max-w-screen-lg font-body">
          {properties.length === 0 ? (
            <p>No properties added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg relative">
                  {property.image && (
                    <img
                      src={property.image}
                      alt="Property Cover"
                      className="w-full h-40 object-cover mb-4 rounded"
                    />
                  )}
                  <h3 className="font-heading text-2xl mb-2">{property.name}</h3>
                  <p className='font-body'>Bedrooms: {property.bedrooms}</p>
                  <p className='font-body'>Bathrooms: {property.bathrooms}</p>
                  <p className='font-body'>Price: ${property.price}</p>
                  <button
                    onClick={() => handleEditProperty(index)}
                    className="absolute bottom-2 right-10 text-pink-500 hover:text-pink-600"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(index)}
                    className="absolute bottom-2 right-2 text-pink-500 hover:text-pink-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellYourPropertyPage;
