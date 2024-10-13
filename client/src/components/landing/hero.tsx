import React from 'react'

const hero = () => {
  return (
    <div className="hero bg-white min-h-screen flex align-top justify-evenly">
  <div className="hero-content flex-col lg:flex-row-reverse justify-start">
    <img
      src="./hero.png"
      className="w-full max-w-[700.233px] h-auto max-h-[594px] flex-shrink-0" />
    <div className='space-y-20 '>
      <h1 className="text-5xl font-bold text-black">Your Gateway to a New Professional Future</h1>
      {/* <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p> */}
      <button className="btn border-t-green-600">Get Started</button>
    </div>
  </div>
</div>
  )
}

export default hero
