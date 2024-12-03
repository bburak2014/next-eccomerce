"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProductData {
	id: number;
	price: number;
	title: string;
	thumbnail: string;

}
interface RemoveProductData {
	id: number;
}

interface ProductContextType {
	productData: ProductData[];
	addProductData: (data: ProductData) => void; // Correctly define the function
	removeProductData: (data: RemoveProductData) => void; // Correctly define the function
	totalPrice: number;

}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
	const [productData, setProductData] = useState<ProductData[]>([]);

	const addProductData = (data: ProductData) => {
		setProductData((prevData) => {
			// Prevent duplicates
			if (prevData.some((item) => item.id === data.id)) {
				return prevData.filter((item) => item.id !== data.id); // Remove if exists (toggle behavior)
			}
			return [...prevData, data]; // Add new if it doesn't exist
		});
	};

	
	const removeProductData = (data: RemoveProductData) => {
		setProductData((prevData) => prevData.filter((item) => item.id !== data.id));
	  }


	const totalPrice = parseFloat(productData.reduce((total, product) => total + product.price, 0).toFixed(2));


	return (
		<ProductContext.Provider value={{ productData, addProductData, totalPrice,removeProductData }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductData = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProductData must be used within a ProductProvider");
	}
	return context;
};
