import Image from 'next/image'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
	<div className='flex items-center justify-between px-8 py-7'>
    <Image src="/images/LogoProduct.png" alt="logo" width={170} height={35} />
    <div className='flex items-center gap-4'>
  
    </div>
  </div>
  )
}

export default index