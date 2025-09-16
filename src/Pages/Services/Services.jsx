import React, { useEffect, useRef, useState } from "react";
import serviceImage from "../../assets/Images/services-left-image2.png";

const Services = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const heroRef = useRef();
  const cardRefs = useRef([]);

  // Hero section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Cards observer
  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  // Function to handle smooth scrolling to contact section
  const handleContactClick = (e) => {
    e.preventDefault();
    
    // Try multiple possible selectors for the contact form/section
    const contactSelectors = [
      '#contact',
      '[id="contact"]',
      '.contact-section',
      '.contact-form',
      'form[class*="contact"]',
      'div[class*="contact"]',
      'footer #contact',
      'footer .contact-section',
      'footer .contact-form',
      'footer form',
      'footer'
    ];
    
    let contactElement = null;
    
    for (const selector of contactSelectors) {
      contactElement = document.querySelector(selector);
      if (contactElement) break;
    }
    
    if (contactElement) {
      // For mobile devices, scroll to bottom of page to ensure contact form is visible
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // On mobile, scroll to the very bottom to ensure form is fully visible
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        
        // Scroll to bottom with a small offset to account for any sticky elements
        window.scrollTo({
          top: documentHeight - 50,
          behavior: 'smooth'
        });
        
        // Secondary attempt after a delay
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 500);
        
      } else {
        // Desktop behavior - scroll to the contact element
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const offset = navbarHeight + 20;
        
        const elementPosition = contactElement.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
      
    } else {
      // Fallback: scroll to bottom of page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const servicesData = [
    {
      title: "Internship and Placement",
      description: "Unlock your future: internships and placements for career success!"
    },
    {
      title: "University Admission Compliance",
      description: "Ensure your future: comply with university admission requirements for a seamless entry."
    },
    {
      title: "Email Marketing",
      description: "Email marketing services provide targeted campaigns, automation, and analytics tools."
    },
    {
      title: "Video and Photography",
      description: "Professional video and photography services for capturing memorable moments perfectly."
    },
    {
      title: "App & Web Development",
      description: "App and web development services deliver customized, user-friendly digital solutions."
    },
    {
      title: "SEO",
      description: "Search engine optimization improves website visibility and ranking on search engines."
    },
    {
      title: "Meta Ads",
      description: "Meta ads services boost online presence through targeted, data-driven advertising."
    },
    {
      title: "Social Media Marketing",
      description: "Social media marketing services enhance brand engagement and drive growth."
    },
    {
      title: "ORM (Online Reputation Management)",
      description: "Online reputation management services improve and maintain your digital image."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-orange-50 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-15">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12"
      >
        <div className={`w-full lg:w-1/2 p-2 sm:p-3 md:p-4 transition-all duration-1000 ease-out ${
          isHeroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-orange-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-105"></div>
            <img 
              src={serviceImage} 
              alt="Service" 
              className="relative w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
        <div className={`w-full lg:w-1/2 p-2 sm:p-3 md:p-4 transition-all duration-1000 ease-out delay-300 ${
          isHeroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">
            Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-600">Service</span>
          </h2>
          <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            We offer a range of digital marketing services to help businesses
            reach their target audience and achieve their marketing goals. Our
            services include:
          </p>
          <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Tailored business solutions delivering efficiency, growth, and
            innovation. Strategize, implement, and optimize operations,
            technology, and marketing to propel your business forward.
          </p>
        </div>
      </div>
      
      {/* Cards Section - Enhanced for tablet responsiveness */}
      <div className="py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-10 2xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10 max-w-7xl mx-auto">
          
          {servicesData.map((service, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`bg-white p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 hover:bg-gradient-to-r hover:from-green-500 hover:to-orange-500 transition-all duration-700 group rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 border border-gray-100 w-full min-h-[200px] flex flex-col justify-between ${
                visibleCards.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: visibleCards.has(index) ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="flex-grow">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-[22px] text-green-600 font-semibold group-hover:text-white transition-colors duration-300 mb-2 sm:mb-3 leading-tight">
                  {service.title}
                </h1>
                <p className="py-1 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base text-gray-600 group-hover:text-white transition-colors duration-300 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
              <div className="mt-3 sm:mt-4">
                <button 
                  onClick={handleContactClick}
                  className="inline-block text-green-700 hover:text-green-800 font-semibold text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Contact us →
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Services;
