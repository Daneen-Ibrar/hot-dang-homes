import React from 'react';
import { getFontSize, getTextAlign } from 'utils/font';

export const Heading = ({ content, level = 2, textAlign = 'left', textColor = 'text-black' }) => {
  const HeadingTag = `h${level}`;

  // Apply text color using a dynamic class or inline style
  const textColorClass = textColor ? `text-${textColor}` : 'text-black';

  return (
    <HeadingTag
      className={` font-heading mx-auto  ${getFontSize(level)} ${getTextAlign(textAlign)} ${textColorClass}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
