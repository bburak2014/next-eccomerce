"use client"

import React, { useState } from 'react'
import ProductImage from '@/components/ProductImage'
type Props = {
	data: string[];
	title: string;
}

const Index = (props: Props) => {
	const { data = [], title = "" } = props
	const [selectedImage, setSelectedImage] = useState(data[0] || ""); // İlk resim varsayılan

	return (
		<div className="flex flex-col items-center gap-5">
			{/* Üstteki Ana Resim */}
			<div className="bg-detailBg p-2 w-full">
				<ProductImage
					key={0}
					src={selectedImage}
					alt={title}
					quality={30}
					fill={true}
				/>
			</div>

			{/* Alt Taraftaki Thumbnail Galerisi */}
			<div className="flex gap-5 justify-start lg:justify-center items-center snap-x overflow-x-auto w-full scrollbar-hidden">
				{data && data.map((image, index) => (
					<div
						key={index}
						className={`cursor-pointer border border-2 ${selectedImage === image ? "border-black opacity-100" : "border-tertiary opacity-30"} snap-center`}
						onClick={() => setSelectedImage(image)}
					>
						<ProductImage
							src={image}
							alt={title}
							quality={30}
							height={100}
							width={143.8}
						/>
					</div>
				))}
			</div>
		</div>



	)
}

export default Index