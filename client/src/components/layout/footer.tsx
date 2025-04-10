'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const socialMedia = [
    { name: 'GitHub', icon: '/socialmediaIcons/mdi_github.png', url: '#' },
    { name: 'LinkedIn', icon: '/socialmediaIcons/linkedinlg.png', url: '#' },
    { name: 'Facebook', icon: '/socialmediaIcons/uil_facebook.png', url: '#' },
    { name: 'Instagram', icon: '/socialmediaIcons/ri_instagram-fill.png', url: '#' },
    { name: 'YouTube', icon: '/socialmediaIcons/mdi_youtube.png', url: '#' },
  ];

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'For Employers', href: '/employers', id: 'employers' },
        { name: 'For Candidates', href: '/candidates', id: 'candidates' },
        { name: 'Success Stories', href: '/success', id: 'success' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/support', id: 'support' },
        { name: 'API Docs', href: '/documentation', id: 'docs' },  // <- updated
        { name: 'Community', href: '/community', id: 'community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', id: 'about' },
        { name: 'Careers', href: '/careers', id: 'careers' },
        { name: 'Blog', href: '/blog', id: 'blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy', id: 'privacy' },
        { name: 'Terms of Service', href: '/terms', id: 'terms' },
        { name: 'Cookie Policy', href: '/cookies', id: 'cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <Image 
                  src="/favicon.png" 
                  fill
                  alt="SkillMatch Logo" 
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#92EDAD] to-[#4CAF50]">
                SkillMatch
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing talent acquisition through AI-powered matching technology.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <div className="relative w-5 h-5">
                    <Image 
                      src={social.icon} 
                      fill
                      alt={social.name}
                      className="object-contain filter invert"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-5">
              <h3 className="text-lg font-medium text-gray-300 tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.href}
                      className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                      onMouseEnter={() => setHoveredLink(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="relative overflow-hidden">
                        <span 
                          className={`block transition-all duration-300 h-px ${hoveredLink === link.id ? 'w-full' : 'w-0'}`}
                          style={{ background: 'linear-gradient(90deg, #92EDAD, #4CAF50)' }}
                        />
                        <span className={`block transition-transform duration-300 ${hoveredLink === link.id ? 'translate-y-0' : ''}`}>
                          {link.name}
                        </span>
                      </span>
                      <svg 
                        className={`ml-2 w-4 h-4 transition-opacity duration-300 ${hoveredLink === link.id ? 'opacity-100' : 'opacity-0'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-300 tracking-wider">
              Stay Updated
            </h3>

            {isSubscribed ? (
              <div className="p-4 rounded-lg bg-gradient-to-r from-[#92EDAD]/10 to-[#4CAF50]/10 border border-[#92EDAD]/20">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#92EDAD] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">You're subscribed to our newsletter!</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Get the latest news and updates delivered to your inbox.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email address"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92EDAD] focus:border-transparent placeholder-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#92EDAD] to-[#4CAF50] text-black px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
          <div>
            <p>© {year ?? '...'} SkillMatch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;