import React, { useEffect, useState } from 'react';

const UserDetail = ({ user }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState('');
    const [properties, setProperties] = useState([]);

    // Fetch the bio from localStorage when the user changes
    useEffect(() => {
        const savedBio = localStorage.getItem(`${user.username}_bio`) || 'No bio available.';
        setBio(savedBio);
    }, [user]);

    // Fetch the profile picture from localStorage when the user changes
    useEffect(() => {
        if (user && user.username) {
            const storedProfilePic = localStorage.getItem(`profilePic_${user.username}`);
            if (storedProfilePic) {
                setProfilePic(storedProfilePic); // Fetch the base64 image from localStorage
            } else {
                setProfilePic('default-profile.png'); // Fallback to default image if no profile picture found
            }
        }
    }, [user]);

    // Fetch the properties from localStorage when the user changes
    useEffect(() => {
        if (user && user.username) {
            const storedProperties = JSON.parse(localStorage.getItem(`${user.username}_properties`)) || [];
            setProperties(storedProperties);
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className="bg-white mt-5 border w-[800px] border-gray-200 rounded-md shadow-sm h-[380px] max-w-xl mx-auto">
            <div
                style={{
                    backgroundImage: `url(${profilePic})`, // Use the profile picture from localStorage
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="relative h-[150px] w-full"
            >
                <div
                    className="absolute left-6 top-[-30px] w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-white shadow-md"
                    style={{
                        backgroundImage: `url(${profilePic})`, // Use the profile picture from localStorage
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {!profilePic && (
                        <span className="flex items-center justify-center h-full text-white text-2xl font-semibold">
                            {user.username[0].toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            <div className="pt-10 px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading text-gray-800">{user.username}</h2>
                </div>

                <p className="font-body text-gray-600">{bio}</p>
                <div className="mt-4">
                    <p className="font-body text-gray-600"><strong>Username:</strong> {user.username}</p>
                </div>

                <div className="mt-4">
                    {properties.length > 0 ? (
                        <ul className="space-y-2">
                            {properties.map((property, index) => (
                                <li key={index} className="font-body text-gray-600 border-b border-gray-200 pb-2">
                                    <strong>{property.name}</strong> - {property.bedrooms} Beds, {property.bathrooms} Baths, ${property.price}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="font-body text-gray-600">No properties available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
