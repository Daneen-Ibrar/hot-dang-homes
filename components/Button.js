import React from 'react';
import Link from 'next/link';
const Button = ({
  text,
  textColor = 'text-white',
  bgColor = 'bg-pink-500',
  className = '',
  justify = 'start', // 'start', 'center', 'end'
}) => {
  // Map the justify prop to Tailwind CSS classes for flex alignment
  const justifyClass = {
    start: 'justify-start', // Aligns button to the left
    center: 'justify-center', // Centers the button
    end: 'justify-end', // Aligns button to the right
  }[justify] || 'justify-start'; // Default to 'start' if no match

  return (
    <div className={`flex ${justifyClass} w-full`}>
      <button 
        className={`font-body mt-3 font-bold px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 ${textColor} ${bgColor} ${className}`}
      >
       {text}
      </button>
    </div>
  );
};

export default Button;
