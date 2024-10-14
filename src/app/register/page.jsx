"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS

export default function Home() {
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Function to handle OTP verification
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      setIsModalOpen(false); // Close modal
      setSuccessMessage("OTP verified successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Function to send OTP using EmailJS
  const sendOtp = async (email) => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(randomOtp);

    const templateParams = {
      to_email: email,
      otp: randomOtp,
    };

    emailjs
      .send(
        "service_e6c1kvk", // Replace with your EmailJS service ID
        "template_vipt0ch", // Replace with your EmailJS template ID
        templateParams,
        "yvDfHnPOgS1j6xYGM" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully", response.status, response.text);
          setIsOtpSent(true);
          setIsModalOpen(true); // Open OTP modal
        },
        (error) => {
          console.error("Failed to send email", error);
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      term,
    } = e.target.elements;

    let errors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Updated email regex
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(firstName.value)) {
      errors.firstName = "First name must have only letters.";
    }

    if (!nameRegex.test(lastName.value)) {
      errors.lastName = "Last name must have only letters.";
    }

    if (!emailRegex.test(email.value)) {
      errors.email = "Invalid email format.";
    }

    if (!passwordRegex.test(password.value)) {
      errors.password =
        "Password must be 3-20 characters & contain one special character.";
    }

    if (password.value !== confirmPassword.value) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!phoneRegex.test(phone.value)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!term.checked) {
      errors.term = "Please agree to the Terms & Conditions.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0 && otpVerified) {
      setSuccessMessage("Form submitted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/pexels-lexovertoom-1109543.jpg')" }}
    >
      <div className="p-4 rounded-lg shadow-md w-full max-w-md bg-transparent bg-cover">
        <h2 className="text-2xl font-bold mb-4 text-center text-violet-800 font-sans">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold font-serif mb-2">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="w-full px-3 bg-transparent py-2 border border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!otpVerified} // Disable input until OTP is verified
            />
            {errors.firstName && (
              <p className="text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!otpVerified} // Disable input until OTP is verified
            />
            {errors.lastName && (
              <p className="text-red-600">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={otpVerified} // Disable email input after verification
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
            {/* Verify Email Button */}
            <button
              type="button"
              onClick={(e) => {
                const emailValue = e.target.form.email.value;
                sendOtp(emailValue); // Use the email value from the input
              }}
              className="mt-2 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isOtpSent} // Disable button after OTP is sent
            >
              Verify Email
            </button>
          </div>

          {/* OTP Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border p-2 mb-4 w-full rounded-lg"
                  placeholder="Enter OTP"
                />
                <button
                  onClick={verifyOtp}
                  className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

          {/* Password Fields and Submit */}
          <div className="mb-2 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!otpVerified} // Disable password input until OTP is verified
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-0 right-0 p-3 mt-7 text-sm text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 mb-2">{errors.password}</p>
          )}

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!otpVerified} // Disable confirm password input until OTP is verified
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!otpVerified} // Disable phone input until OTP is verified
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          <div className="mb-4 flex items-center">
            <input
              name="term"
              type="checkbox"
              className="mr-2"
              disabled={!otpVerified} // Disable checkbox until OTP is verified
            />
            <label className="text-gray-700 text-sm">
              I agree to the Terms & Conditions
            </label>
            {errors.term && <p className="text-red-600">{errors.term}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
            disabled={!otpVerified} // Disable submit button until OTP is verified
          >
            Submit
          </button>

        </form>
        <div className="font-serif mt-2 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-green-600 text-center">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
