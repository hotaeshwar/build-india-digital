import React, { useState } from "react";
import { X, Plus, Minus, Phone, Mail, MapPin, Check } from "lucide-react";

const Package = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [expandedCards, setExpandedCards] = useState({
    gold: false,
    platinum: false,
    diamond: false
  });

  const [customPackage, setCustomPackage] = useState({
    name: '',
    phone: '',
    email: '',
    selectedPackage: '',
    selectedAddons: [],
    customFeatures: '',
    budget: '',
    timeline: '',
    additionalRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const packages = {
    gold: {
      name: 'Gold Package',
      price: '₹22,500',
      features: [
        "Platform: Facebook, Instagram, LinkedIn & Twitter",
        "Daily Social Media Posts",
        "Social media Management",
        "New Year Promo Plan - 30 sec",
        "GMB Setup and Design Logo & Cover",
        "Optimizing BIO & Interface",
        "Social Media Analytics Report",
        "Content Calendar Planning",
        "Basic SEO Optimization",
        "Monthly Performance Reports"
      ]
    },
    platinum: {
      name: 'Platinum Package',
      price: '₹35,000',
      features: [
        "Platform: Facebook, Instagram, LinkedIn & Twitter",
        "Platform: YouTube (Basic: Update Channel Art)",
        "SEO work: Listing 1 hour - Blog",
        "Technology 2 ads and posting of graphics",
        "SEO work Indexing of 3 keyword",
        "GMB Profile Optimization",
        "Google My Business optimization & Keyword",
        "Advanced Analytics & Reporting",
        "Competitor Analysis",
        "Email Marketing Integration"
      ]
    },
    diamond: {
      name: 'Diamond Package',
      price: '₹50,000',
      features: [
        "Platform: Facebook, Instagram, LinkedIn & Twitter",
        "New Events Updates",
        "New Social Media Post",
        "Monthly 2 ads and budget inclusions",
        "25 Keyword Optimization",
        "WhatsApp Bulk SMS",
        "Requirements list: You specify the details",
        "24/7 Priority Support",
        "Advanced Marketing Automation",
        "Custom Landing Pages",
        "Conversion Rate Optimization"
      ]
    }
  };

  const addonOptions = [
    { id: 'linkedin-facebook', name: 'LinkedIn & Facebook page management', price: '₹5,000' },
    { id: 'facebook-boost', name: 'Live Facebook page boost', price: '₹3,000' },
    { id: 'youtube-optimization', name: 'YouTube content optimization', price: '₹4,000' },
    { id: 'google-ads', name: 'Google Ads Management', price: '₹8,000' },
    { id: 'google-ads-boost', name: 'Google Ads Boost (15000+)', price: '₹15,000' },
    { id: 'advanced-seo', name: 'Advanced SEO Package', price: '₹6,000' },
    { id: 'content-creation', name: 'Additional Content Creation', price: '₹4,500' },
    { id: 'influencer-marketing', name: 'Influencer Marketing Campaign', price: '₹10,000' }
  ];

  const toggleCard = (cardType) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardType]: !prev[cardType]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomPackage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddonToggle = (addonId) => {
    setCustomPackage(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter(id => id !== addonId)
        : [...prev.selectedAddons, addonId]
    }));
  };

  const calculateTotalPrice = () => {
    const basePackagePrice = customPackage.selectedPackage === 'gold' ? 22500 :
                           customPackage.selectedPackage === 'platinum' ? 35000 :
                           customPackage.selectedPackage === 'diamond' ? 50000 : 0;
    
    const addonPrice = customPackage.selectedAddons.reduce((total, addonId) => {
      const addon = addonOptions.find(option => option.id === addonId);
      return total + (addon ? parseInt(addon.price.replace('₹', '').replace(',', '')) : 0);
    }, 0);

    return basePackagePrice + addonPrice;
  };

  const generateCustomerUUID = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const isFormValid = () => {
    return customPackage.name.trim() !== '' && 
           customPackage.phone.trim() !== '' && 
           customPackage.email.trim() !== '' &&
           customPackage.selectedPackage !== '';
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const customerUUID = generateCustomerUUID();
      const selectedAddonNames = customPackage.selectedAddons.map(id => {
        const addon = addonOptions.find(option => option.id === id);
        return `${addon.name} (${addon.price})`;
      });

      const formElement = document.createElement('form');
      formElement.action = 'https://formsubmit.co/himanshukhanegwal@gmail.com';
      formElement.method = 'POST';
      formElement.style.display = 'none';

      const fields = {
        'Customer ID': customerUUID,
        'Name': customPackage.name,
        'Phone': customPackage.phone,
        'Email': customPackage.email,
        'Base Package': customPackage.selectedPackage ? `${packages[customPackage.selectedPackage].name} (${packages[customPackage.selectedPackage].price}/month)` : 'Not selected',
        'Selected Addons': selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'No addons selected',
        'Estimated Total': `₹${calculateTotalPrice().toLocaleString()}/month`,
        'Custom Features': customPackage.customFeatures || 'No custom features specified',
        'Budget Range': customPackage.budget || 'Not specified',
        'Timeline': customPackage.timeline || 'Not specified',
        'Additional Requests': customPackage.additionalRequests || 'No additional requests',
        'Timestamp': new Date().toLocaleString(),
        '_subject': `Custom Package Request - Customer ID: ${customerUUID}`,
        '_next': window.location.href,
        '_captcha': 'false'
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        formElement.appendChild(input);
      });

      document.body.appendChild(formElement);
      formElement.submit();

      setTimeout(() => {
        if (document.body.contains(formElement)) {
          document.body.removeChild(formElement);
        }
      }, 1000);

      setCustomPackage({
        name: '',
        phone: '',
        email: '',
        selectedPackage: '',
        selectedAddons: [],
        customFeatures: '',
        budget: '',
        timeline: '',
        additionalRequests: ''
      });

      setSubmitStatus('success');

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <div className="px-4 sm:px-6 md:px-8 lg:px-14 py-8 sm:py-12 md:py-16 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-600">Package</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empowering businesses through innovative digital marketing solutions
          </p>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-orange-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-20">
          
          {/* Gold Package */}
          <div className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-green-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-4 sm:py-6 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">GOLD</h2>
              <p className="relative text-green-100 text-sm sm:text-base mt-1">Professional</p>
            </div>
            
            <div className="text-center py-4 sm:py-6 bg-gradient-to-b from-green-50 to-white">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">₹22,500</div>
              <div className="text-sm sm:text-base text-gray-500">per month</div>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {packages.gold.features.slice(0, expandedCards.gold ? packages.gold.features.length : 5).map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 text-xs sm:text-sm md:text-base">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
              
              <button
                onClick={() => toggleCard('gold')}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
              >
                {expandedCards.gold ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{expandedCards.gold ? 'View Less' : 'View More'}</span>
              </button>
            </div>

            <div className="p-4 sm:p-6 pt-2 sm:pt-4">
              <a
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
                href="#contact"
              >
                Get Started →
              </a>
            </div>
          </div>

          {/* Platinum Package */}
          <div className="relative md:col-span-2 xl:col-span-1">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-orange-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg z-20">
              RECOMMENDED
            </div>
            
            <div className="group bg-white rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border-2 border-orange-300 overflow-hidden mt-6">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-4 sm:py-6 relative">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">PLATINUM</h2>
                <p className="relative text-yellow-100 text-sm sm:text-base mt-1">Business</p>
              </div>
              
              <div className="text-center py-4 sm:py-6 bg-gradient-to-b from-yellow-50 to-white">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">₹35,000</div>
                <div className="text-sm sm:text-base text-gray-500">per month</div>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {packages.platinum.features.slice(0, expandedCards.platinum ? packages.platinum.features.length : 5).map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 text-xs sm:text-sm md:text-base">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
                
                <button
                  onClick={() => toggleCard('platinum')}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-200"
                >
                  {expandedCards.platinum ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{expandedCards.platinum ? 'View Less' : 'View More'}</span>
                </button>
              </div>

              <div className="p-4 sm:p-6 pt-2 sm:pt-4">
                <a
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
                  href="#contact"
                >
                  Get Started →
                </a>
              </div>
            </div>
          </div>

          {/* Diamond Package */}
          <div className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-orange-200 overflow-hidden md:col-span-2 xl:col-span-1">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-4 sm:py-6 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">DIAMOND</h2>
              <p className="relative text-orange-100 text-sm sm:text-base mt-1">Enterprise</p>
            </div>
            
            <div className="text-center py-4 sm:py-6 bg-gradient-to-b from-orange-50 to-white">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600">₹50,000</div>
              <div className="text-sm sm:text-base text-gray-500">per month</div>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {packages.diamond.features.slice(0, expandedCards.diamond ? packages.diamond.features.length : 5).map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 text-xs sm:text-sm md:text-base">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
              
              <button
                onClick={() => toggleCard('diamond')}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200"
              >
                {expandedCards.diamond ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{expandedCards.diamond ? 'View Less' : 'View More'}</span>
              </button>
            </div>

            <div className="p-4 sm:p-6 pt-2 sm:pt-4">
              <a
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
                href="#contact"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>

        {/* Add-on Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-orange-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">PREMIUM ADD-ONS</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white leading-relaxed">LinkedIn & Facebook page management</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white leading-relaxed">Live Facebook page boost</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white leading-relaxed">YouTube content optimization</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white leading-relaxed">Google Ads Management</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white leading-relaxed">Google Ads Boost (15000+)</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={() => setShowPopup(true)}
                className="inline-block bg-white text-orange-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-lg"
              >
                Customize Package
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Package Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="bg-gradient-to-r from-green-600 to-orange-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold">Build Your Custom Package</h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-green-100 mt-2">Create your perfect package by selecting a base plan and adding premium features</p>
            </div>

            {/* Popup Content */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Your custom package request has been sent successfully! We'll contact you with a personalized quote.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    Error sending your request. Please try again.
                  </div>
                )}

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={customPackage.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone *"
                      value={customPackage.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={customPackage.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none mt-4"
                    required
                  />
                </div>

                {/* Base Package Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Base Package *</h3>
                  <div className="space-y-3">
                    {Object.entries(packages).map(([key, pkg]) => (
                      <label key={key} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="selectedPackage"
                          value={key}
                          checked={customPackage.selectedPackage === key}
                          onChange={handleInputChange}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{pkg.name}</div>
                          <div className="text-sm text-gray-600">{pkg.price}/month</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Addon Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Add-ons (Optional)</h3>
                  <div className="space-y-3">
                    {addonOptions.map((addon) => (
                      <label key={addon.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customPackage.selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonToggle(addon.id)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{addon.name}</div>
                          <div className="text-sm text-gray-600">{addon.price}/month</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="budget"
                    placeholder="Your Budget Range"
                    value={customPackage.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="timeline"
                    placeholder="Expected Timeline"
                    value={customPackage.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>

                <textarea
                  name="customFeatures"
                  placeholder="Describe any custom features or modifications..."
                  rows="3"
                  value={customPackage.customFeatures}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-vertical"
                />

                <textarea
                  name="additionalRequests"
                  placeholder="Any additional requirements or special requests..."
                  rows="2"
                  value={customPackage.additionalRequests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-vertical"
                />
              </div>

              {/* Package Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  {/* Selected Package Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Summary</h3>
                    
                    {/* Base Package */}
                    {customPackage.selectedPackage && (
                      <div className="mb-4 p-4 bg-white rounded-lg border">
                        <div className="font-medium text-gray-800">Base Package</div>
                        <div className="text-sm text-gray-600">{packages[customPackage.selectedPackage].name}</div>
                        <div className="text-lg font-bold text-green-600">{packages[customPackage.selectedPackage].price}/month</div>
                      </div>
                    )}

                    {/* Selected Addons */}
                    {customPackage.selectedAddons.length > 0 && (
                      <div className="mb-4">
                        <div className="font-medium text-gray-800 mb-2">Selected Add-ons</div>
                        {customPackage.selectedAddons.map(addonId => {
                          const addon = addonOptions.find(option => option.id === addonId);
                          return (
                            <div key={addonId} className="flex justify-between items-center p-2 bg-white rounded border mb-2">
                              <div className="text-sm text-gray-700">{addon.name}</div>
                              <div className="text-sm font-medium text-gray-600">{addon.price}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Total Price */}
                    {(customPackage.selectedPackage || customPackage.selectedAddons.length > 0) && (
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <div className="font-semibold text-gray-800">Estimated Total</div>
                          <div className="text-xl font-bold text-green-600">
                            ₹{calculateTotalPrice().toLocaleString()}/month
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          *Final pricing may vary based on custom requirements
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span>08054481253</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-green-600" />
                        <span className="text-xs">info@buildinngindiadigital.com</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                        <div className="text-xs leading-relaxed">
                          <div className="font-medium">Building India Digital</div>
                          <div>SCO 246 Upper Ground Floor</div>
                          <div>Devaji Plaza, Zirakpur 140603</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="border-t bg-gray-50 px-4 sm:px-6 py-4 sm:py-6 rounded-b-2xl">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full sm:flex-1 bg-gray-300 text-gray-700 py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold hover:bg-gray-400 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid()}
                  className="w-full sm:flex-1 bg-gradient-to-r from-green-600 to-orange-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold hover:from-green-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Custom Package Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;