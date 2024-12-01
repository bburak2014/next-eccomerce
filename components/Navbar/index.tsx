import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const index = () => {
  return (
    <div className='flex items-center justify-between px-8 py-7 sticky top-0 left-0 w-full bg-white border-b-2 border-b-customBorder z-50'>
      <Link href={'/products'}><Image src="/images/LogoProduct.png" alt="logo" width={170} height={35} priority /></Link>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-4'>
          <Image src="/icons/search.svg" alt="search" width={24} height={24} />
          <Image src="/icons/error.svg" alt="error" width={24} height={24} />
          <Image src="/icons/notification.svg" alt="notification" width={24} height={24} />
        </div>
        <div className='flex items-center gap-4 leading-6 '>
          <div className='flex items-center justify-center font-bold text-green rounded-full bg-green-custom-1 w-44 h-44'>SG</div>
          <p className='flex items-center gap-1 font-normal text-primary'>Selin Gül
            <Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default index