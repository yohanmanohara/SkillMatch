'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Try again.');
    }
  };

  return (
    <footer className="bg-[#92EDAD] text-black pb-8">
      <div className="md:flex md:justify-between sm:px-12 px-4 md:items-center py-2"></div>
      
      {/* Top SkillMatch logo section */}
      <div className="flex items-center pl-16 mb-4">
        <Image src="/skillmatchlogo.png" width={30} height={30} alt="SkillMatch Logo" className="mr-2" />
        <div className="text-2xl font-bold">SkillMatch</div>
      </div>
      
      <div className='md:flex md:justify-between sm:px-12 px-4 md:items-center py-2'>
        {/* Audience Section */}
        <div className="mb-4 md:mb-0 pl-12">
          <h5 className="font-bold mb-2">Audience</h5>
          <ul>
            <li><a href="#" className="text-gray-600 hover:text-black text-lg">Employers</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black text-lg">Candidates</a></li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="mb-4 md:mb-0 pl-12">
          <h5 className="font-bold mb-2">Help</h5>
          <ul>
            <li><a href="#" className="text-gray-600 hover:text-black text-lg">Customer Support</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black text-lg">Documentation</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="mb-4 md:mb-0 pl-12">
          <h5 className="font-bold mb-2">Legal</h5>
          <ul>
            <li><a href="#" className="text-gray-600 hover:text-black text-lg">Terms of Service</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black text-lg">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-end">
          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-8">
            <Image src="/socialmediaIcons/mdi_github.png" width={20} height={30} alt="GitHub" />
            <Image src="/socialmediaIcons/linkedinlg.png" width={20} height={30} alt="LinkedIn" />
            <Image src="/socialmediaIcons/uil_facebook.png" width={20} height={30} alt="Facebook" />
            <Image src="/socialmediaIcons/ri_instagram-fill.png" width={20} height={30} alt="Instagram" />
            <Image src="/socialmediaIcons/mdi_youtube.png" width={20} height={30} alt="YouTube" />
          </div>

          {/* Email Subscription Section */}
          <div className="flex items-right">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white py-2 px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe} className="bg-black text-white font-bold py-2 px-4 font-mono">Subscribe</button>
          </div>
          {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs mt-6">
        <p className="text-black-600">&copy; 2024 SkillMatch. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
