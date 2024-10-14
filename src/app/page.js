"use client";
import React, { useState } from "react";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, phone, term } = formData;

    let errors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(firstName)) {
      errors.firstName = "First name must have only letters!";
    }

    if (!nameRegex.test(lastName)) {
      errors.lastName = "Last name must have only letters!";
    }

    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format. Only .com domains are allowed.";
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 3-20 characters & contain one special character.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!term) {
      errors.term = "Please agree to the Terms & Conditions.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Send the data to the backend
      try {
        const response = await fetch("http://localhost:3500/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage("Form submitted successfully!");

          // Clear the form fields
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
          });
        } else {
          setSuccessMessage("Form submission failed.");
        }
      } catch (error) {
        setSuccessMessage(`Error: ${error.message}`);
      }
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
              value={formData.firstName}
              onChange={handleChange}
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
              value={formData.lastName}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-2 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              value={formData.confirmPassword}
              onChange={handleChange}
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
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-3 py-2 border bg-transparent border-pink-500 rounded-lg"
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                name="term"
                type="checkbox"
                onChange={(e) =>
                  setFormData({ ...formData, term: e.target.checked })
                }
                className="w-5 h-5 border-pink-500 rounded-md text-indigo-600 focus:ring-0"
              />
              <span className="ml-2 text-black font-serif">
                I agree to the Terms & Conditions
              </span>
            </label>
            {errors.term && <p className="text-red-600">{errors.term}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-800"
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
        {successMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center text-xl font-medium">
            {successMessage}
          </div>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
