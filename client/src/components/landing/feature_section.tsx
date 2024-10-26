import React from 'react'
import Feature_card from './feature_card'

const feature_card = () => {
  return (
    <div>
        <div className='text-xl font-bold'>Features</div>
        <div className='flex sm:flex-row flex-col items-center justify-center gap-10'>
          <Feature_card />
          <Feature_card />
          <Feature_card />
          <Feature_card />
        </div>
    </div>
  )
}

export default feature_card