'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  // Toggle Login function to log the user in and out
  const handleLogin = (): void => {
    setLoggedIn(!loggedIn);
  };
  


  return (
    <div className="navbar text-black font-sans font-semibold sticky">
      <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
        </div>
        <ul
        tabIndex={0}
        className="menu dropdown-content w-screen h-screen z-[9999] ">
        <li><a>Home</a></li>
        <li><Link href='./jobs'>Jobs</Link></li>
        <li><a>About Us</a></li>
        </ul>
      </div>
        <div className='flex justify-evenly space-x-2 px-5'>
          <img src='/favicon.png' alt='logo' className="w-6 h-10" />
          <div className="text-2xl font-extrabold text-[20px] leading-[160%] cursor-pointer sm:text-xl">SkillMatch</div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-10 text-lg">
          <li><a>Home</a></li>
          <li><Link href={"./jobs"}>Jobs</Link></li>
          <li><a>About Us</a></li>
        </ul>
      </div>
      <div className="navbar-end flex space-x-5 px-5">
        {loggedIn ? (
          // Login button
          <Button variant="secondary" className='w-[107px] h-12 rounded-m font-sans font-bold'>Log in</Button>
        ) : (
          // Profile picture
          <img src='./Guy4.png' alt='user' className="w-6 h-10 rounded-full cursor-pointer" />
        )}
      </div>
    </div>
  );
}

export default Navbar;
