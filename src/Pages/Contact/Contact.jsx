import React, { useState } from "react";
import Chatbot from "../../Components/Chatbot/Chatbot";
import contactbg2 from "../../assets/Images/contact-bg2.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Message Validation
    if (!formData.message) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate customer UUID
  const generateCustomerUUID = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const customerUUID = generateCustomerUUID();

      // Create a hidden form element for FormSubmit
      const formElement = document.createElement('form');
      formElement.action = 'https://formsubmit.co/himanshukhanegwal@gmail.com';
      formElement.method = 'POST';
      formElement.style.display = 'none';

      // Add form fields
      const fields = {
        'Customer ID': customerUUID,
        'Name': formData.name,
        'Phone': formData.phone,
        'Email': formData.email,
        'Message': formData.message,
        'Timestamp': new Date().toLocaleString(),
        '_subject': `New Contact Form Submission - Customer ID: ${customerUUID}`,
        '_next': window.location.href, // Redirect back to current page
        '_captcha': 'false' // Disable captcha
      };

      // Create and append input fields
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        formElement.appendChild(input);
      });

      // Append form to body and submit
      document.body.appendChild(formElement);
      formElement.submit();

      // Clean up - remove form after submission
      setTimeout(() => {
        if (document.body.contains(formElement)) {
          document.body.removeChild(formElement);
        }
      }, 1000);

      // Show success popup
      setShowPopup(true);

      // Reset form fields
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    } catch (error) {
      // Handle submission errors
      console.error('Submission error:', error);

      // Set generic error message
      setErrors({
        submit: "Failed to submit form. Please try again later."
      });
    } finally {
      // Always reset submission state
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div
        className="w-full bg-cover bg-center h-auto py-8 sm:py-12 md:py-16"
        style={{ backgroundImage: `url(${contactbg2})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">
            {/* Left Section - Contact Details */}
            <div className="animate-slide-in-left w-full md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-white font-bold text-2xl sm:text-3xl text-center md:text-left mb-4">
                Building India Digital
              </h1>
              <div className="py-4 sm:py-6 md:py-8 text-white text-sm sm:text-base text-center md:text-left">
                At Building India Digital, we pride ourselves on delivering high-quality
                services that exceed our clients' expectations. Our team of experts works
                closely with our clients to understand their unique requirements and
                deliver customized solutions that meet their needs.
              </div>

              {/* Contact Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                <div className="bg-white p-2 sm:p-3 rounded-full text-orange-400 mx-auto md:mx-0">
                  <i className="fa-solid fa-phone text-sm sm:text-base"></i>
                </div>
                <div className="w-full text-center md:text-left">
                  <h1 className="text-white font-medium text-lg sm:text-xl">
                    For any enquiry, Call Us:
                  </h1>
                  <div className="text-sm sm:text-base">
                    <p className="text-white py-2">9041499964</p>
                    <p className="text-white py-2">9041499973</p>
                </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex flex-col sm:flex-row items-start gap-4 py-6 sm:py-8">
                <div className="bg-white p-2 sm:p-3 rounded-full text-orange-400 mx-auto md:mx-0">
                  <i className="fa-solid fa-location-dot text-sm sm:text-base"></i>
                </div>
                <div className="text-white text-sm sm:text-base text-center md:text-left">
                  <p>#246, Devaji VIP Plaza, VIP Road, Zirakpur, India</p>
                  <p className="py-3 sm:py-4">DLF, Cyber City, Gurugram, India</p>
                  <p>Head Office - Plot No. 2466, Sec 82, Mohali, India</p>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="animate-slide-in-right w-full md:w-1/2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
                {/* Name & Phone Fields */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <div className="bg-orange-200 rounded-xl p-2">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="focus:outline-none w-full bg-transparent text-sm sm:text-base"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="w-full">
                    <div className="bg-orange-200 rounded-xl p-2">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Mobile No."
                        maxLength="10"
                        className="focus:outline-none w-full bg-transparent text-sm sm:text-base"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <div className="bg-orange-200 rounded-xl p-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="focus:outline-none w-full bg-transparent text-sm sm:text-base"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div className="mb-4">
                  <div className="bg-orange-200 rounded-xl p-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      className="h-20 sm:h-24 md:h-28 lg:h-32 w-full focus:outline-none bg-transparent text-sm sm:text-base"
                    ></textarea>
                  </div>
                  {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Global Error Message */}
                {errors.submit && (
                  <div className="text-red-500 text-center mb-4 text-sm">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <div className="bg-orange-300 hover:bg-orange-400 transition-colors rounded-full px-4 py-2 my-2 sm:my-4 w-full text-center">
                  <button
                    className="w-full cursor-pointer text-sm sm:text-base"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Contact'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup after Form Submission */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl max-w-sm w-full shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-green-600">
              Form Submitted Successfully!
            </h2>
            <p className="mt-3 sm:mt-4 text-center text-gray-700 text-sm sm:text-base">
              Our representative will contact you soon.
            </p>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 z-50">
        <div className=" rounded-full p-2 sm:p-3 cursor-pointer shadow-lg">
          <Chatbot />
        </div>
      </div>
    </>
  );
};

export default Contact;
