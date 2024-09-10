import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


const HomepageSection3 = () => {
  const [acfFields, setAcfFields] = useState({
    bgimg: "",
    sec3heading: "",
    sec3text: "",
    icon1: "",
    icon2: "",
    icon3: ""
  });


  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch("http://hot-dang-homes-course.local/wp-json/wp/v2/pages?slug=home");
        const data = await response.json();
        if (data && data.length > 0) {
          const acf = data[0]?.acf || {};
          setAcfFields({
            bgimg: acf.bgimg || "",
            sec3heading: acf.sec3heading || "",
            sec3text: acf.sec3text || "",
            icon1: acf.icon1 || "",
            icon2: acf.icon2 || "",
            icon3: acf.icon3 || ""
          });
        }
      } catch (error) {
        console.error("Error fetching ACF fields:", error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <div className="h-screen relative min-h-[400px] flex justify-center items-center bg-slate-800">
      <img
        src={acfFields.bgimg}
        alt=""
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
        className="mix-blend-soft-light"
      />
      <div className="relative z-10 max-w-5xl text-center text-white">
        <h2 className="text-4xl font-heading mb-4">
          {acfFields.sec3heading}
        </h2>
        <p className="text-lg font-body mb-8">
          {acfFields.sec3text}
        </p>
        <div className="flex justify-center space-x-4">
          {acfFields.icon1 && (
            <Image
              src={acfFields.icon1}
              height={100}
              width={100}
              alt="Icon 1"
       
            />
          )}
          {acfFields.icon2 && (
            <Image
              src={acfFields.icon2}
              height={100}
              width={100}
              alt="Icon 2"
             
            />
          )}
          {acfFields.icon3 && (
            <Image
              src={acfFields.icon3}
              height={100}
              width={100}
              alt="Icon 3"
             
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomepageSection3;
