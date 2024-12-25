

"use client";

import Image from 'next/image'
import React, { useState } from 'react'

const data = [
	{ name: "Özellik 1", value: 1 },
	{ name: "Özellik 2", value: 2 },
	{ name: "Özellik 3", value: 3 },
	{ name: "Özellik 4", value: 4 },
]

const FeaturesCard = () => {
	const [feature, setFeature] = useState(1)
	return (
		<div className="flex flex-col gap-custom-9 font-medium	">
			<label className="custom-22 font-bold text-base	">Özellik seç:</label>
			<div className="flex gap-5">
				{
					data.slice(0,2).map((item) => (
						<button style={{width:"189px"}} key={item.value} onClick={() => setFeature(item.value)} className={`px-5 py-3 text-start flex flex-col gap-custom-7 w-145 ${item.value === feature ? "bg-white shadow-[0_5px_10px_rgba(0,0,0,0.1)]" : " border-gray-custom-2 border-0.5 "} `}>
							<div className="flex gap-5 items-center">
								<span className={`text-sm  ${item.value === feature ? 'text-black' : 'text-gray-custom-2'} `}>{item.name}</span>
								{item.value === feature && <Image src="/icons/check.svg" width={19} height={19} alt="check" />}

							</div>
							<div className={`text-sm  ${item.value === feature ? 'text-black' : 'text-gray-custom-2'} `}>Lorem İpsum Dolar Sit
								Amet</div>
						</button>
					))
				}


			</div>
			<div className="flex gap-5">
				{
					data.slice(2).map((item) => (
						<button style={{width:"189px"}} key={item.value} onClick={() => setFeature(item.value)} className={`px-5 py-3 text-start flex flex-col gap-custom-7 w-145 ${item.value === feature ? "bg-white shadow-[0_5px_10px_rgba(0,0,0,0.1)]" : " border-gray-custom-2 border-0.5 "} `}>
							<div className="flex gap-5 items-center">
								<span className={`text-sm  ${item.value === feature ? 'text-black' : 'text-gray-custom-3'} `}>{item.name}</span>
								{item.value === feature && <Image src="/icons/check.svg" width={19} height={19} alt="check" />}

							</div>
							<div className={`text-sm  ${item.value === feature ? 'text-black-custom-1' : 'text-gray-custom-2'} `}>Lorem İpsum Dolar Sit
								Amet</div>
						</button>
					))
				}


			</div>
			
		</div>
		)
}

export default FeaturesCard