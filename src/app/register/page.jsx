"use client"
import React, { useState } from 'react';
const page = () => {

    const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setSuccessMessage('Form submitted successfully!!!!!!');

  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-violet-800 font-sans">Registration Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold  font-serif mb-2" >
            First Name
          </label>
          <input name="firstName" 
                 type="text" 
                 placeholder="First Name" 
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
  
        
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-serif" >
            Last Name
          </label>
          <input name="lastName" 
                 type="text"
                 placeholder="Last Name" 
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
  
       
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
            Email
          </label>
          <input name="email"
                 type="email" 
                 placeholder="Email"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
  

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-serif" >
            Password
          </label>
          <input name="password"
                 type="password" 
                 placeholder="Password"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
  
      
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-serif" >
            Confirm Password
          </label>
          <input name="confirmPassword"
                 type="password" 
                 placeholder="Confirm Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
  
       
       
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-serif">
            Gender
          </label>
          <div className="flex items-center">
            <input name="gender"
                   type="radio" 
                   value="male" 
                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"/>
            <label className="ml-2 block text-sm text-gray-800">Male</label>
          </div>
          <div className="flex items-center mt-2">
            <input name="gender" 
                   type="radio" 
                   value="female"
                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"/>
            <label className="ml-2 block text-sm text-gray-800">Female</label>
          </div>
        </div>

        <div className="mb-2">
         <label  className="block text-sm font-bold text-gray-700 font-serif">Phone Number</label>
         <input type="tel" 
                name="phone" 
                placeholder="+91 "
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required />
        </div>
       
        <div className="mb-2 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 font-serif hover:underline  hover:text-blue-700 ">
            <input name="terms"
                   type="checkbox" 
                   className="mr-2 leading-tight  accent-violet-800"/>
            I agree to the Terms & Conditions
          </label>
        </div>
 
        <div className="mt-4">
          <button type="submit" 
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
            Create Account
          </button>
        </div>
        <div className="font-serif mt-2 text-center">
          Already have an account ? <a href='#' className="text-blue-600 hover:underline">Sign In</a>
        </div>
      </form>

      {successMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center text-xl font-medium">
            {successMessage}
          
          </div>
        )}
    </div>
  </div>
  )
}

export default page
