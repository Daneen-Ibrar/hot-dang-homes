import React from 'react';
import Image from 'next/image';

const Img = ({ src, alt, width, height, className }) => {
  return (
    <div className={className} style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
      <Image
        src={src}
        alt={alt || 'Image'}
        className='object-cover'
        fill
      />
    </div>
  );
};

export default Img;
