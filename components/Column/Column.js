import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import gsap with ScrollTrigger, ensuring it's only loaded on the client
const gsapPromise = import('gsap');
const scrollTriggerPromise = import('gsap/ScrollTrigger');

export const Column = ({ width, children }) => {
    const columnRef = useRef(null);

    useEffect(() => {
        // Resolve the imported modules
        Promise.all([gsapPromise, scrollTriggerPromise])
            .then(([gsapModule, scrollTriggerModule]) => {
                const gsap = gsapModule.default;
                const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

                // Register the ScrollTrigger plugin
                gsap.registerPlugin(ScrollTrigger);

                // Initialize GSAP animation with ScrollTrigger
                gsap.fromTo(columnRef.current, 
                    {
                        x: '-100%',      // Start from off-screen to the left
                        opacity: 0,      // Start from fully transparent
                    }, 
                    {
                        duration: 0.8,   // Animation duration
                        x: '0%',         // End at the natural position
                        opacity: 1,      // End fully opaque
                        ease: 'power3.out', // Smooth easing for a natural feel
                        scrollTrigger: {
                            trigger: columnRef.current, // The element to trigger the animation
                            start: 'top 80%',           // When the top of the element is 80% into the viewport
                            once: true,                 // Ensure the animation only plays once
                        }
                    }
                );
            })
            .catch(error => console.error("GSAP or ScrollTrigger failed to load", error));
    }, []);

    const widthStyle = width ? { minWidth: width, flexGrow: 1 } : { flexGrow: 1, flexBasis: 0 };

    return (
        <div ref={columnRef} style={widthStyle} className="px-4 py-5">
            {children}
        </div>
    );
};

export default Column;
