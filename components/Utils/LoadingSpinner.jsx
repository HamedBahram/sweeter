import React from 'react'

const LoadingSpinner = ({ className }) => {
  return (
    <div className={className}>
      <div className='h-full w-full animate-spin rounded-full border-2 border-inherit border-t-transparent'></div>
    </div>
  )
}

export default LoadingSpinner
