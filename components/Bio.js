import React, { useState, useEffect } from 'react';

const Bio = ({ username }) => {
    const [bio, setBio] = useState('');

    useEffect(() => {
        const savedBio = localStorage.getItem(`${username}_bio`) || '';
        setBio(savedBio);
    }, [username]);

    const handleSaveBio = () => {
        localStorage.setItem(`${username}_bio`, bio);
        alert('Bio updated successfully!');
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
                <h2 className="text-3xl font-heading text-gray-800 flex-grow">Your Bio</h2>
              
            </div>
            <div className="mb-6">
                <p className="text-gray-600 font-body mb-2">Tell others a little bit about yourself:</p>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-4 border border-gray-300  font-body rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                    rows="6"
                    placeholder="E.g., your hobbies, interests, career, or fun facts about you..."
                />
            </div>
            <div className="flex items-center justify-center mt-4">
                <div className="w-1/2 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg"></div>
               
            </div>
            <div className=' flex items-center justify-center'>
            <button
            onClick={handleSaveBio}
            className="bg-gradient-to-r mt-4 from-pink-500 font-body to-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:from-purple-600 hover:to-pink-500 transition duration-300 ease-in-out"
        >
            Save Bio
        </button>
        </div>
        </div>
    );
};

export default Bio;
