import Image from 'next/image'
import React from 'react'


const index = () => {
  return (
	<div className='flex items-center justify-between px-8 py-7 sticky top-0 left-0 w-full bg-white border-b-2 border-b-customBorder z-50'>
    <Image src="/images/LogoProduct.png" alt="logo" width={170} height={35} />
    <div className='flex items-center gap-4'>
  
    </div>
  </div>
  )
}

export default index