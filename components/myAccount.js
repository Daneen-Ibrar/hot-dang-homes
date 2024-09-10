import React, { useState, useEffect } from 'react';
import ProfilePic from './ProfilePic';
import ImageUpload from './ImageUpload';
import { Account } from './Account';
import UserDetail from './UserDetails';
import Bio from './Bio'; // Import the Bio component
import Image from 'next/image';
const MyAccountPage = ({ username: propUsername,  }) => {
    const [acfFields, setAcfFields] = useState({ sec1heading: "" });
    const [profilePic, setProfilePic] = useState('');
    const [showImages, setShowImages] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showOtherUsers, setShowOtherUsers] = useState(false);
    const [showBio, setShowBio] = useState(false); // State for showing Bio
    const [images, setImages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [username, setUsername] = useState(propUsername);


    useEffect(() => {
        if (!propUsername) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.username) {
                setUsername(user.username);
            }
        }
    }, [propUsername]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://hot-dang-homes-course.local/wp-json/wp/v2/pages?slug=my-account");
                const data = await response.json();
                if (data && data.length > 0) {
                    const acf = data[0]?.acf || {};
                    setAcfFields({ sec1heading: acf.sec1heading || "" });
                }
            } catch (error) {
                console.error("Error fetching ACF fields:", error);
            }
        };
        fetchData();
        updateImages();
        loadUsers();
    }, []);

    const updateImages = () => {
        const savedImages = JSON.parse(localStorage.getItem('images')) || [];
        setImages(savedImages);
    };

    const loadUsers = () => {
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(savedUsers);
    };

    const handleToggleImages = () => {
        setShowImages(!showImages);
        setShowAccount(false);
        setShowOtherUsers(false);
        setShowBio(false);
        setSelectedUser(null);
    };

    const handleToggleAccount = () => {
        setShowAccount(!showAccount);
        setShowImages(false);
        setShowOtherUsers(false);
        setShowBio(false);
        setSelectedUser(null);
    };

    const handleToggleBio = () => {
        setShowBio(!showBio); // Toggle Bio state
        setShowImages(false);
        setShowAccount(false);
        setShowOtherUsers(false);
        setSelectedUser(null);
    };

    const handleToggleOtherUsers = () => {
        setShowOtherUsers(!showOtherUsers);
        setShowImages(false);
        setShowAccount(false);
        setShowBio(false);
        setSelectedUser(null);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowOtherUsers(false);
    };

    const handleGoBack = () => {
        setSelectedUser(null);
        setShowOtherUsers(true);
    };

    const handleDeleteImage = (indexToDelete) => {
        const filteredImages = images.filter((_, index) => index !== indexToDelete);
        localStorage.setItem('images', JSON.stringify(filteredImages));
        setImages(filteredImages);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto p-6 max-w-screen-lg flex-grow">
                <h1 className="text-5xl font-heading mb-4">Hi there, {username || "User"}</h1>
                <div className="flex mt-10">
                    <div className="flex flex-col items-center mr-4">
                        <ProfilePic username={username} onProfilePicChange={setProfilePic} />
                        <button onClick={handleToggleImages} className="mt-5 font-body text-pink-500 hover:text-pink-600">
                            {showImages || selectedUser ? "Go Back" : "Posts"}
                        </button>
                        <button onClick={handleToggleAccount} className="mt-5 font-body text-pink-500 hover:text-pink-600">
                            {showAccount || selectedUser ? "Go Back" : "Account"}
                        </button>
                        <button onClick={handleToggleBio} className="mt-5 font-body text-pink-500 hover:text-pink-600">
                            {showBio || selectedUser ? "Go Back" : "Your Bio"}
                        </button>
                        {!selectedUser && (
                            <button onClick={handleToggleOtherUsers} className="mt-5 font-body text-pink-500 hover:text-pink-600">
                                {showOtherUsers ? "Go Back" : "Users"}
                            </button>
                        )}
                    </div>
                    <div className="w-0.5 bg-gray-300 h-[400px] mx-4"></div>
                    <div className="">
                        {showBio ? (
                            <Bio username={username} />
                        ) : showAccount && !selectedUser ? (
                            <Account username={username} />
                        ) : selectedUser ? (
                            <div>
                                <UserDetail user={selectedUser} />
                            </div>
                        ) : showOtherUsers ? (
                            <div className="mt-10">
                                <h2 className="text-2xl font-heading mb-4">User List</h2>
                                <div className="grid grid-cols-4 gap-4">
                                    {users.map((user, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center mb-4 cursor-pointer"
                                            onClick={() => handleUserClick(user)}
                                        >
                                            <div
                                                className="w-[70px] h-[70px] rounded-full overflow-hidden bg-gray-300 flex items-center justify-center"
                                                style={{
                                                    backgroundImage: user.profilePic ? `url(${user.profilePic})` : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            >
                                                {!user.profilePic && (
                                                    <span className="text-white text-xl font-bold">
                                                        {user.username[0].toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-center font-body text-gray-600 mt-2">{user.username}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : showImages ? (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, index) => (
                                    <div key={index} className="flex flex-col items-center mb-4 relative">
                                        <div className={`w-[200px] h-[200px] rounded-md shadow-lg overflow-hidden relative`}>
                                            <Image src={img.image} alt={`Uploaded by ${username}`} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-sm text-center font-body text-gray-600 mt-2">{img.caption}</p>
                                        <div className="flex items-center justify-center  w-full mt-2">
                                            <button onClick={() => handleDeleteImage(index)} className="bg-red-500 text-white font-body font-bold rounded px-4 py-2 hover:bg-red-600 transition duration-300">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ImageUpload onImageSave={updateImages} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountPage;
