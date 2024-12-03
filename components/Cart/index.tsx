
"use client";

import { useProductData } from '@/app/context/ProductCartContext';
import React from 'react';
import ProductImage from '../ProductImage';
import Cart from '@/components/icons/Cart';
import Trash from '@/components/icons/Trash';

interface Props {
	setshowCart: (show: boolean) => void;
}

const Index: React.FC<Props> = (props) => {
	const { setshowCart } = props;
	const { productData, removeProductData } = useProductData();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md backdrop-filter bg-black bg-opacity-30 transition-all duration-500 ease-in-out">
			<div
				className="bg-white rounded-lg w-full max-w-lg mx-4 p-6 transform transition-all duration-500 ease-out scale-95 opacity-0 animate-open-modal sm:w-11/12 md:w-2/3"
			>
				{/* Modal Header */}
				<div className="flex justify-between items-center mb-4 border-b-0.5 p-2 border-[#C1C1C1]">


					<h3 className="text-xl font-semibold text-gray-900 flex items-center gap-4 "> <Cart />Alışveriş Sepeti</h3>
					<button
						onClick={() => setshowCart(false)}
						className="text-gray-600 hover:text-gray-900 focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Modal Body */}
				<div className="space-y-4 font-poppins">
					{productData?.length > 0 ? (
						productData.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between group"
							>
								<div className="flex items-center space-x-4">
									<ProductImage
										width={50}
										height={50}
										src={item.thumbnail}
										alt={item.title}
									/>
									<div>
										<h4 className="text-medium font-medium text-gray-custom-1">
											{item.title}
										</h4>
										<p className="text-gray-500 text-md font-semibold">
											${item.price}
										</p>
									</div>
								</div>
								<button
									onClick={() => removeProductData({ id: item.id })}
									className="hidden group-hover:block transititon ease-out-300" 
								>
									<Trash />
								</button>
							</div>
						))
					) : (
						<p>Sepetiniz boş</p>
					)}
				</div>


				{/* Modal Footer */}
				<div className="flex justify-end space-x-4 mt-6">
					<button disabled={productData?.length <= 0 } className={`px-6 py-2 text-white rounded-md  ${productData?.length > 0 ? "bg-green opacity-100 hover:opacity-80":"bg-green-300	" }`}>
						Sepeti Onayla
					</button>
				</div>
			</div>
		</div>

	);
};

export default Index;
