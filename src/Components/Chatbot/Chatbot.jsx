import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  // WhatsApp Business configuration
  const WHATSAPP_NUMBER = "08054481253";
  const WHATSAPP_GREETING = "Welcome to Building India Digital! 👋 We're excited to help you grow your business with our digital solutions. How can we assist you today?";

  // Generate random particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  // WhatsApp logo SVG component
  const WhatsAppLogo = ({ className = "h-6 w-6" }) => (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.087z"/>
    </svg>
  );

  // Function to open WhatsApp with pre-filled message and beautiful animation
  const openWhatsApp = () => {
    setIsClicked(true);

    // Encode the greeting message
    const encodedMessage = encodeURIComponent(WHATSAPP_GREETING);
    const whatsappURL = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Add a slight delay for the animation effect
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      setIsClicked(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50">
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.8;
            }
          }
          
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }

          .shine-effect {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transform: translateX(-100%);
            transition: transform 1s;
          }

          .shine-effect:hover {
            transform: translateX(100%);
          }
        `}
      </style>

      {/* Floating WhatsApp Button with Beautiful Animation */}
      <div className="relative">
        {/* Pulsing ring animation */}
        <div className="absolute -inset-2 bg-green-400 rounded-full opacity-75 animate-ping"></div>
        <div className="absolute -inset-1 bg-green-500 rounded-full opacity-50 animate-pulse"></div>
        
        {/* Main WhatsApp Button */}
        <button
          id="whatsapp-button"
          onClick={openWhatsApp}
          disabled={isClicked}
          className={`relative bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-2xl transform transition-all duration-300 overflow-hidden group ${
            isClicked 
              ? 'scale-95 shadow-lg' 
              : 'hover:scale-110 shadow-3xl hover:-translate-y-1'
          }`}
          style={{ width: "70px", height: "70px" }}
          aria-label="Contact us on WhatsApp"
        >
          <div className="flex items-center justify-center h-full">
            <WhatsAppLogo 
              className={`h-10 w-10 transform transition-all duration-300 ${
                isClicked ? 'rotate-12 scale-110' : ''
              }`} 
            />
          </div>
          
          {/* Click animation overlay */}
          {isClicked && (
            <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
          )}
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full opacity-20 -skew-x-12 shine-effect"></div>
        </button>

        {/* Notification badge */}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
          !
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-800 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap shadow-lg">
            Chat with Building India Digital
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Welcome message popup (appears on hover) */}
      <div className="absolute bottom-20 right-0 opacity-0 hover:opacity-100 transition-all duration-300 transform translate-y-2 hover:translate-y-0 pointer-events-none group">
        <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200">
          <div className="flex items-center mb-2">
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <WhatsAppLogo className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Building India Digital</h3>
              <p className="text-xs text-gray-500">Typically replies instantly</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Welcome to Building India Digital! We're here to help you grow your business. 
          </p>
          <div className="flex items-center text-xs text-green-600">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Online now
          </div>
        </div>
      </div>

      {/* Background particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Chatbot;