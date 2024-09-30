"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();


    let errors = {};
   
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,20}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;


    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format and Only .com domains are allowed.";
    }

    
    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 3-20 characters &  one special character.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("Login Succesfully !!!!!!!!!!!!!!")
    } 

    
  };

  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center  bg-gray-100" style={{ backgroundImage: "url('/com.jpg')" }}>
      <div className="bg-cover  p-5 max-w-md w-full rounded-lg shadow-md bg-transparent" style={{ backgroundImage: "url('')" }}>
        <Image src="/numetry.jpeg" alt="" width={50} height={50} className='mb-2 rounded-md'></Image>
        <h1 className='text-3xl font-semibold mb-2 text-pink-500 '>Welcome Back</h1>
        <p className='text-yellow-600 mb-5'>Enter to get unlimited access to data</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email Address <span className='text-red-500 text-lg'>*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border bg-gray-50 border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            {errors.email && <p className="text-red-700">{errors.email}</p>}

          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password <span className='text-red-500 text-lg'>*</span></label>
            <div className="relative">
              <input
                id="password"
                name="password"
                placeholder='enter your password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                className="mt-1 p-2 w-full border  bg-gray-50 border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle the show/hide state
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-black "
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errors.password && (
              <p className="text-red-700  mb-2">{errors.password}</p>
            )}
          <div className="flex items-center justify-between">
            <label htmlFor="remember_me" className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="accent-pink-600 h-4 w-4 text-indigo-600  border-gray-300 rounded" />
              <span className="ml-2 block text-sm text-gray-900">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
          <div>
            <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
              Login
            </button>
          </div>
        </form>
        <div className='mt-4 flex flex-row ml-5'>
          <div className='border-black h-5 border-b-2 w-1/3'></div>
          <div className='w-fit p-2 text-center text-sm'>Or &apos; Login With</div>
          <div className='border-black h-5 border-b-2 w-1/3'></div>
        </div>
        <div className='flex flex-row justify-center border-2 rounded-lg mt-2 p-1'>
          <FcGoogle className='mr-2 h-10 w-7'/>
          <a className='mt-2 cursor-pointer' href='/'>Sign up with Google</a>
        </div>
        <div className='flex flex-row justify-center border-2 rounded-lg mt-2 p-1'>
          <SiFacebook className='mr-2 h-10 w-7'/>
          <a className='mt-2 cursor-pointer' href='/'>Sign up with Facebook</a>
        </div>
       
        <p className='mt-5 font-medium text-center'> Don&apos;t have an account? <a href="/register" className='text-blue-700 underline cursor-pointer'>Register here</a></p>
      </div>
    </div>
  );
}
