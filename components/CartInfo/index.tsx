"use client";
import { useProductData } from '@/app/context/ProductCartContext';
import React from 'react'

type Props = {
	productId: string;
	price: number;
	title: string;
	description: string;
	thumbnail: string;
}

const Index = (props: Props) => {
	const { productData, addProductData, totalPrice } = useProductData();
	const { productId, price, title, description, thumbnail } = props
	const isInCart = productData?.some((item) => item.id === Number(productId));

	return (
		<div className='w-full flex justify-between items-center  border-t-0.5  border-[#C1C1C1] flex-wrap font-poppins sticky bottom-0 left-0 z-50 bg-white'>
			<div className='flex'>
				<div className='divide-x divide-slate-200 py-8 px-8 border-r border-r-black/20 font-bold text-22 leading-custom-33 tracking-1p text-black'>Sipariş Özeti</div>

				<div className='flex flex-col py-7 px-8'>
					<h3 className='font-bold text-lg leading-6 text-black'>{title}</h3>
					<h3 className='font-normal text-base leading-custom-22 text-gray-custom-1'>{description.length <= 100 ? description : `${description.slice(0, 100)}... `}</h3>


				</div>
			</div>
			<div className='flex py-7 px-7 gap-4'>
				<div className='text-34 font-medium	leading-custom-46 text-black'>${totalPrice || 0}</div>
				<button onClick={() => addProductData({ id: Number(productId), price: price, title: title, thumbnail: thumbnail })} className={`px-9 py-3 rounded-lg text-white font-inter font-base leading-5 text-sm ${isInCart ? "bg-orange" : "bg-green"}`}>
					{isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
				</button>
			</div>
		</div>
	)
}

export default Index