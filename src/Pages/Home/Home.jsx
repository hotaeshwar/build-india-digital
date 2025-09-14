import React from "react";
import logo from "../../assets/Images/front-image.png";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 py-14 lg:py-0">
        {/* Text content - left side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left animate-slide-in-left">
          <h2 className="text-base sm:text-lg font-medium">WELCOME TO</h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold py-4 sm:py-6 md:py-8 leading-tight">
            <span className="text-orange-500 block sm:inline">Building</span>
            <span className="text-black block sm:inline">India</span>
            <span className="text-green-500 block sm:inline">Digital</span>
          </h1>
          <h3 className="text-orange-500 text-lg sm:text-xl">One Step IT Solutions</h3>
          <p className="mt-4 text-gray-700 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
            We're a digital marketing powerhouse, fueling brands with top-notch
            SEO, PPC, and social media expertise. Trust us to amplify your online
            presence and drive meaningful results.
          </p>
          <button className="mt-6 bg-orange-500 text-blue px-4 py-2 rounded hover:bg-orange-600 transition-colors">
            Learn More
          </button>
        </div>
        
        {/* Image container */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 animate-slide-in-right">
          <div className="w-full flex justify-center">
            {/* India map image */}
            <img 
              src={logo} 
              alt="India Map" 
              className="w-4/5 md:w-5/6 lg:w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
