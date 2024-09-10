import React from 'react';


export const Paragraph = ({ content, textAlign = 'left', textColor = "text-black" }) => {
    const textAlignClass = `text-${textAlign}`; // Assuming you have Tailwind classes like text-left
    const textColorClass = textColor ? `text-${textColor}` : 'text-black';
    return (
        <p className={` font-body mt-3 text-lg  ${textAlignClass} ${textColorClass}`}>
            {content}
        </p>
    );
};
