import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/bid-logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`fixed w-full z-50 top-0 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-4  sm:px-6 lg:px-25 py-2">
        {/* Logo - Always visible */}
        <div>
          <img src={logo} alt="logo" className="h-20 w-auto" />
        </div>

        {/* Navigation Links - ONLY visible on desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {["Home", "About Us", "Services", "Packages"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-black font-bold hover:text-orange-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Menu - ONLY on mobile */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black font-bold hover:text-orange-500"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              // Close (X) Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md absolute top-16 left-0 w-full border-b border-gray-200">
          <ul className="py-2">
            {["Home", "About Us", "Services", "Packages"].map((item) => (
              <li key={item} className="px-4 py-2">
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-black font-bold hover:text-orange-500"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;