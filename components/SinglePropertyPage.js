// components/SinglePropertyPage.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar'; // Adjust the import path as needed
import { getPropertyById } from './db'; // Adjust the import path as needed
import Image from 'next/image';
const SinglePropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        const prop = await getPropertyById(Number(id));
        setProperty(prop);
      };
      fetchProperty();
    }
  }, [id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 max-w-screen-lg flex-grow">
        <h1 className="font-heading text-5xl mt-8 mb-4">{property.name}</h1>
        {property.image && (
          <Image
            src={property.image}
            alt="Property Cover"
            className="w-full h-80 object-cover mb-4 rounded"
          />
        )}
        <p className="font-body text-lg mb-2">Bedrooms: {property.bedrooms}</p>
        <p className="font-body text-lg mb-2">Bathrooms: {property.bathrooms}</p>
        <p className="font-body text-lg mb-2">Price: ${property.price}</p>
        <p className="font-body text-lg mb-2">Parking Spaces: {property.parking}</p>
        <p className="font-body text-lg mb-2">Pets Allowed: {property.pets ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default SinglePropertyPage;
