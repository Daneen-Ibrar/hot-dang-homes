import React from "react";
import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="h-screen bg-slate-800 relative min-h-[400px] flex justify-center items-center">
    <div className="absolute inset-0 z-0 mix-blend-soft-light">
    <Image
      src={background}
      alt=""
      layout="fill"
      objectFit="cover"
      style={{ mixBlendMode: 'soft-light' }}  // Apply directly to the Image style
      priority
    />
  </div>
      <div className="max-w-5xl z-10">
        {children}
      </div>
    </div>
  );
};
