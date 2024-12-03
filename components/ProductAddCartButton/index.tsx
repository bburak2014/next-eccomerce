"use client";
import { useProductData } from "@/app/context/ProductCartContext";

type Props = {
	productId: number;
	price: number;
	title: string;
	thumbnail: string;
};

const Index = ({ productId, price, title, thumbnail, }: Props) => {
	const { productData, addProductData } = useProductData();
 
	const updateProductData = () => {
		addProductData({ id: productId, price: price, title: title, thumbnail: thumbnail });
	};

	const isInCart = productData?.some((item) => item.id === productId);
	return (
		<>
			<button
				onClick={updateProductData}
				className={`font-inter w-full text-white rounded-lg py-3 font-medium text-sm text-light leading-5 transition-colors duration-300 ${isInCart ? "bg-orange" : "bg-green"}`}
			>
				{isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
			</button>
		</>
	);
};

export default Index;
