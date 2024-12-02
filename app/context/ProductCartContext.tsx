"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProductData {
  id: number;
}

interface ProductContextType {
  productData: ProductData[];
  addProductData: (data: ProductData) => void; // Correctly define the function
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

  return (
    <ProductContext.Provider value={{ productData, addProductData }}>
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
