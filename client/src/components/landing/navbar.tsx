import React from 'react'

const navbar = () => {
  return (
   <div className="navbar bg-white text-black font-encode font-semibold">
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
        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li><a>Jobs</a></li>
        <li><a>About Us</a></li>
      </ul>
   
    </div>
    <a className=" text-xl cursor-pointer">SkillMatch</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-10">
      {['Home', 'Jobs', 'About Us'].map((item) => (
        <li key={item} className="hover:bg-green-500 rounded-box ">
          <a>{item}</a>
        </li>
      ))}
    </ul>
  </div>
  <div className="navbar-end flex space-x-5" >
  <a className="btn btn-ghost  hover:bg-green-500 rounded-box "><img src='./Notification.png' className="w-4 h-4"/></a>
    <img src='./favicon.png' alt='logo' className="w-6 h-10" />
  </div>
</div>
  )
}

export default navbar
