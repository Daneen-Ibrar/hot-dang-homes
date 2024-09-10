import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, BaseStyles } from '@primer/react';
import client from "client";
import LoginPopup from "../components/loginPopup"; // Ensure this path is correct
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically
import "../styles/globals.css";

function MyApp({ Component, pageProps, username }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Check if the user is logged in every time the route changes
      const loggedIn = localStorage.getItem('loggedIn') === 'true';
      setIsAuthenticated(loggedIn);
      setShowLoginPopup(!loggedIn);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Initial check to set state based on current authentication status
    handleRouteChange();

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleLogin = (username) => {
    localStorage.setItem('loggedIn', 'true');
    setIsAuthenticated(true);
    setShowLoginPopup(false);
    router.push('/'); // Redirect to the account page after login
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
    setShowLoginPopup(true); // Show the login popup immediately
    router.push('/'); // Redirect to the homepage
  };

  return (
    <ThemeProvider>
      <BaseStyles>
        <ApolloProvider client={client}>
          <Component {...pageProps} onLogin={handleLogin} onLogout={handleLogout} />
          {showLoginPopup && <LoginPopup username={username} onLogin={handleLogin} setIsAuthenticated={setIsAuthenticated} />}
        </ApolloProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default MyApp;
