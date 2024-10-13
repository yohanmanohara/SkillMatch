import React from 'react'
import { tailChase } from 'ldrs'
function loading() {
    tailChase.register();
  return (
    <div>
    <div className="flex items-center justify-center min-h-screen">
         <l-tail-chase
           size="84"
           speed="2.9"
           color="#62F985"
         ></l-tail-chase>
       </div>
   </div>
  )
}

export default loading
