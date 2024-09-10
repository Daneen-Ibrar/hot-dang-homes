import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const securityQuestions = [
  'What is your favourite month?',
  'What was the name of your favourite film?',
  'What is your favourite colour?',
];

const LoginPopup = ({ onLogin, setIsAuthenticated }) => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState(null);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState(securityQuestions[0]);
  const [securityAnswer, setSecurityAnswer] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setStoredUser(JSON.parse(user));
    }
    const loggedIn = localStorage.getItem('loggedIn');
    const lastLogin = localStorage.getItem('lastLogin');
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (loggedIn !== 'true' || (Date.now() - lastLogin > oneDayInMilliseconds)) {
      setShow(true);
    }
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      securityQuestion,
      securityAnswer,
    };

    // Get existing users from localStorage, or start with an empty array if none exist
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    users.push(newUser);

    // Save the updated array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Also save the current user as the logged-in user
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('lastLogin', new Date().getTime().toString());

    // Update the state
    setStoredUser(newUser);
    setIsAuthenticated(true);  // This line now correctly calls the function passed as a prop

    // Close the signup modal or redirect, depending on your app's behavior
    setShow(false); // Adjust this based on your app's structure
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Retrieve all users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find the user in the array based on the entered username and password
    const foundUser = users.find(user => user.username === username && user.password === password);
  
    if (foundUser) {
      // If user is found, log them in and set their details in localStorage
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('lastLogin', Date.now().toString());
  
      // Call the onLogin function to update the parent state
      onLogin(username);
  
      // Hide the login popup
      setShow(false);
      setError('');
    } else {
      // If user is not found, show an error
      setError('Incorrect username or password');
    }
  };
  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignUp(e);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm z-60 transform transition-all scale-100 duration-300">
        <h2 className="text-3xl font-heading mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='font-body'>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className='relative'>
            <label className="block font-body text-gray-700 text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-body px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              {passwordVisible ? <FaEyeSlash className="text-gray-600 mt-5" /> : <FaEye className="text-gray-600 mt-5" />}
            </button>
          </div>
          {!isLogin && (
            <>
              <div className='font-body'>
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="security-question">
                  Security Question
                </label>
                <select
                  id="security-question"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                >
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question}>{question}</option>
                  ))}
                </select>
              </div>
              <div className='font-body'>
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="security-answer">
                  Security Answer
                </label>
                <input
                  id="security-answer"
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-pink-500 font-body text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            >
              {isLogin ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center font-body">
          <a
            href="#"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-pink-500 hover:text-pink-600 transition duration-300"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
