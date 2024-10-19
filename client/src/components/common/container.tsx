import React from 'react'

interface ContainerfProps {
  children: React.ReactNode
  fullHeight?: boolean
  fullScreen?: boolean
}

const Container: React.FC<ContainerfProps> = ({
  children,
  fullHeight,
  fullScreen,
}) => {
  return (
    <div
      className={`
        relative
        max-w-[1500px]
        mx-auto
        xl:px-20
        md:px-10
        sm:px-10
        px-2
        pt-32
        
        ${fullHeight ? 'h-full' : ''}
        ${fullScreen ? 'h-screen' : ''}
      `}
    >
      {children}
    </div>
  )
}

export default Container