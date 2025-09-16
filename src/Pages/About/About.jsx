import React, { useEffect, useState } from "react";
import { Eye, Target, Award, Users, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";
import logo from "../../assets/Images/bid-logo.png";

const About = () => {
  const [isVisible, setIsVisible] = useState({
    vision: false,
    mission: false,
    whyChoose: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      setIsVisible(prev => ({
        vision: scrollY > 100,
        mission: scrollY > 300,
        whyChoose: scrollY > 500
      }));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Title */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
            About <span className="text-green-600">Building India Digital</span>
          </h1>
          <p className="text-center text-gray-600 mt-4 text-lg">
            Empowering businesses through innovative digital marketing solutions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Logo Column - Left Side */}
            <div className="lg:col-span-4">
              <div className={`lg:sticky lg:top-20 flex justify-center transition-all duration-1000 ${
                isVisible.vision ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-110"></div>
                  <img 
                    src={logo} 
                    alt="Building India Digital Logo" 
                    className="relative w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Content Column - Right Side */}
            <div className="lg:col-span-8 space-y-8">
              {/* Vision Section */}
              <div className={`transition-all duration-1000 delay-200 ${
                isVisible.vision ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-7 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                      <Eye className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Our <span className="text-green-600">Vision</span>
                    </h2>
                  </div>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    To become India's leading digital marketing agency, empowering businesses 
                    of all sizes to achieve unprecedented growth through innovative, data-driven 
                    digital solutions. We envision a future where every business can harness 
                    the full potential of digital marketing to reach new heights of success.
                  </p>
                </div>
              </div>

              {/* Mission Section */}
              <div className={`transition-all duration-1000 delay-400 ${
                isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-7 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                      <Target className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Our <span className="text-orange-600">Mission</span>
                    </h2>
                  </div>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    To deliver exceptional, customized digital marketing solutions that drive 
                    measurable results for our clients. We are committed to staying at the 
                    forefront of industry trends, utilizing cutting-edge technologies, and 
                    maintaining the highest standards of service excellence in everything we do.
                  </p>
                </div>
              </div>

              {/* Why Choose Us Section */}
              <div className={`transition-all duration-1000 delay-600 ${
                isVisible.whyChoose ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-7 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                      <Award className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Why Choose <span className="text-green-600">Us</span>
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                    At Building India Digital, we don't just deliver services—we build 
                    partnerships. Our team of digital marketing experts works closely with 
                    each client to understand their unique challenges and create tailored 
                    solutions that exceed expectations.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors duration-200">
                      <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="text-white w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-medium">Expert Team</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors duration-200">
                      <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="text-white w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-medium">Data-Driven Results</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                      <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="text-white w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-medium">Innovative Solutions</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors duration-200">
                      <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-medium">Proven Track Record</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
