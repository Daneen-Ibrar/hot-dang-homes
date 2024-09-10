import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ProfilePic = ({ username, onProfilePicChange }) => {
    const [hover, setHover] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (username) {
            // Use username to create a unique key for each user's profile picture
            const savedProfilePic = localStorage.getItem(`profilePic_${username}`);
            if (savedProfilePic) {
                setProfilePic(savedProfilePic);
            } else {
                // Reset the profile pic to null if there's no saved image
                setProfilePic(null);
            }
        }
    }, [username]);

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setProfilePic(imageUrl);
                if (username) {
                    localStorage.setItem(`profilePic_${username}`, imageUrl); // Save to local storage with username-specific key
                }
                onProfilePicChange(imageUrl); // Optional: Pass to parent if needed
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className="relative w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={triggerFileInput}
        >
            <div
                className="w-full h-full flex items-center justify-center rounded-full overflow-hidden"
                style={{
                    backgroundColor: profilePic ? 'transparent' : 'gray', // Fallback color when there is no profile picture
                    backgroundImage: profilePic ? `url(${profilePic})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'filter 0.3s ease',
                    filter: hover ? 'brightness(50%)' : 'none', // Darken on hover
                }}
            >
                {!profilePic && (
                    <span className="text-white text-4xl font-bold">{getInitials(username)}</span>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {hover && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gray-200 bg-opacity-50 rounded-full w-full h-full flex items-center justify-center transition-opacity duration-300">
                        <Image width={100} height={100} src="/icon.png" alt="Edit Profile" className="w-12 h-12" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePic;
