import React from 'react'

const EmptyCard = ({imgSrc,message}) => {
  return (
    <div className='text-center w-screen flex flex-col items-center justify-center h-screen'>
      <img src={imgSrc}alt="No notes" className='w-28 items-center'/>
      <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
      {message}
      </p>
    </div>
  )
}

export default EmptyCard
