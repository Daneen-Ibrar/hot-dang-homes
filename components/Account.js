import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'; 
import gsap from 'gsap';

export const Account = ({ username }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [storedUser, setStoredUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setStoredUser(user);
    }

    gsap.fromTo(
      containerRef.current, 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const handleUsernameChange = () => {
    if (newUsername) {
      const updatedUser = { ...storedUser, username: newUsername };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setStoredUser(updatedUser);
      setMessage('Username updated successfully!');
      setError('');
      redirectToHome();
    } else {
      setError('Please enter a valid username.');
    }
  };

  const handlePasswordChange = () => {
    if (currentPassword !== storedUser.password) {
      setError('Current password is incorrect.');
      return;
    }
    if (securityAnswer !== storedUser.securityAnswer) {
      setError('Security answer is incorrect.');
      return;
    }
    if (newPassword) {
      const updatedUser = { ...storedUser, password: newPassword };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setStoredUser(updatedUser);
      setMessage('Password updated successfully!');
      setError('');
      redirectToHome();
    } else {
      setError('Please enter a valid password.');
    }
  };

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.setItem('showLoginPopup', 'true');  // Intend to show the login popup

    // Use Next.js router to push to the homepage
    router.push('/').then(() => {
        // Force update the state or trigger a global event listener here
        // Since we're using local storage to signal the need for a popup, we should ensure that
        // any component that depends on this should correctly listen to changes.
        // For this example, let's force a rerender or a state update in your app component.
        window.dispatchEvent(new Event('storage'));
    });
};

  

  const redirectToHome = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', 'false');
      router.push('/');
    }
  };

  return (
    <div ref={containerRef}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex space-x-8">
        <div className="w-1/2">
          <h3 className="text-xl font-heading text-gray-800 mb-4">Change Username</h3>
          {error && <p className="text-red-600 font-body mb-2">{error}</p>}
          {message && <p className="text-green-600 font-body mb-2">{message}</p>}
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full font-body px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
          />
          <button
            onClick={handleUsernameChange}
            className="w-full font-body uppercase font-bold bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Change Username
          </button>
        </div>

        <div className="w-1/2">
          <h3 className="text-xl font-heading text-gray-800 mb-4">Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full font-body px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full font-body px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <p className="text-gray-600 font-body mb-2">{storedUser?.securityQuestion}</p>
          <input
            type="text"
            placeholder="Answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            className="w-full font-body px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handlePasswordChange}
            className="w-full font-body font-bold uppercase bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Change Password
          </button>
        </div>
<button
  onClick={handleLogout}
  className="font-body font-bold uppercase bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
  style={{
    display: 'inline-block',
    padding: '10px 20px', // Adjust padding to your preference
  }}
>
  <span
    style={{
      display: 'inline-block',
      transform: 'rotate(90deg)', // Rotate the text 90 degrees
      transformOrigin: ' centercenter', // Rotate around the left center
    }}
  >
    Logout
  </span>
  
</button>





      </div>

    

      </div>
  );
};
