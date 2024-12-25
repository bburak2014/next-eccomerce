"use client";

import Image from 'next/image'
import React, { useState } from 'react'


const ColorCard = () => {
	const [color, setColor] = useState("")
	return (
		<div className="flex flex-col gap-custom-9">
			<label className="custom-22 font-bold text-base	">Renk seç:</label>
			<div className="flex gap-5">
				<button onClick={() => setColor("silver")} className="px-5 py-3 flex items-center gap-5 border-gray-custom-2 border-0.5 w-145">
					<div className="flex gap-custom-9 items-center">
						<div className="w-5 h-5 rounded-full bg-gray-custom-2 "></div>
						<span className='text-sm text-gray-custom-2' >Silver</span>
					</div>
					{color === "silver" && <Image src="/icons/check.svg" width={19} height={19} alt="check" />}
				</button>
				<button onClick={() => setColor("black")} className="px-5 py-3 flex items-center gap-5 bg-white shadow-[0_5px_10px_rgba(0,0,0,0.1)] w-145">
					<div className="flex gap-custom-9 items-center">
						<div className="w-5 h-5 rounded-full bg-black"></div>
						<span className='text-sm text-black'>Black</span>
					</div>
					{color === "black" && <Image src="/icons/check.svg" width={19} height={19} alt="check" />}
				</button>
			</div>
		</div>)
}

export default ColorCard