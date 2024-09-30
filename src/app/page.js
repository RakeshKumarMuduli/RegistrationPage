"use client";
import React, { useState } from "react";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    const phoneRegex = /^\d{10}$/; 

    
    if (!nameRegex.test(firstName.value)) {
      errors.firstName = "First name must have only letters!!!";
    }

    
    if (!nameRegex.test(lastName.value)) {
      errors.lastName = "Last name must have only letters !!!";
    }

    
    if (!emailRegex.test(email.value)) {
      errors.email = "Invalid email format and Only .com domains are allowed.";
    }

    
    if (!passwordRegex.test(password.value)) {
      errors.password =
        "Password must be 3-20 characters &  one special character.";
    }

    
    if (password.value !== confirmPassword.value) {
      errors.confirmPassword = "Passwords do not match.";
    }

    
    if (!phoneRegex.test(phone.value)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!term.checked) {
      errors.term = "please agree the Terms & Conditions.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSuccessMessage("Form submitted successfully!!!!!!");
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
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-2 relative ">
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-0 right-0  p-3 mt-7  text-sm text-black "
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
              type="tel"
              placeholder="+91"
              className="mt-1 p-2 w-full border bg-transparent border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 font-serif">
              <input
                name="term"
                type="checkbox"
                className="mr-2 leading-tight accent-violet-800"
              />
              I agree to the Terms & Conditions
            </label>
            {errors.term && <p className="text-red-600">{errors.term}</p>}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
          <div className="font-serif mt-2 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        </form>

        {successMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center text-xl font-medium">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
