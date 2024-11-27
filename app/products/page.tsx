// product list
import { Poppins } from 'next/font/google';
import SearchInput from "@/components/SearchInput";
import CategorySelect from "@/components/CategorySelect";
import { Metadata } from "next";
import React from "react";
import { fetchProducts, fetchCategory } from "@/utils/api";
import {PAGE_LIMIT} from "@/utils/helper";
import { ProductResponse } from '@/utils/type';
import ProductCard from "@/components/ProductCard"; 
import Pagination from "@/components/Pagination";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

// Metadata bilgisi
export const metadata: Metadata = {
  title: "Ürünler",
  description: "Ürün listeleme sayfası",
};

// Sayfa bileşeni için gerekli props
interface ProductsPageProps {
  searchParams: { page?: string; search?: string; category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // searchParams'ı asenkron olarak almak ve await etmek
  const { page, search, category } = await searchParams; // 'await' kullanmak gerekiyor.

  const pageParam = page || "1"; // Eğer yoksa "1"
  const currentPage = isNaN(Number(pageParam)) ? 1 : Number(pageParam); // Geçersiz bir parametre için varsayılan 1
  const skip = (currentPage - 1) * PAGE_LIMIT; // Skip değeri hesapla
  const searchQuery = search || ""; // Arama sorgusu
  const categoryQuery = category || ""; // Kategori sorgusu

  let data: ProductResponse;
  let categories: string[];

  try {
    [data, categories] = await Promise.all([
		fetchProducts(PAGE_LIMIT, skip, searchQuery, categoryQuery),
		fetchCategory() as Promise<string[]>
	  ]);
  } catch {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-500">Ürünler Yüklenemedi</h1>
        <p>Lütfen daha sonra tekrar deneyin.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / PAGE_LIMIT); // Toplam sayfa sayısı

 const paginationProps= {
	currentPage,
	totalPages,
	searchQuery,
	categoryQuery,
  }

  return (
    <div className={`grid grid-cols-10 gap-8 px-5 py-2 lg:px-20 md:py-8 bg-background h-full ${poppins.className}`}>
      <div className="col-span-10 md:col-span-4 lg:col-span-3 xl:col-span-2 w-full">
        <div className='sticky top-[126px]'>
        <SearchInput initialSearchQuery={searchQuery} />
        <CategorySelect initialCategory={categoryQuery} categories={categories} />
        </div>
      </div>

      <div className="col-span-10 md:col-span-6 lg:col-span-7 xl:col-span-8  gap-7">
        <h3 className="font-bold text-xl text-primary leading-[30px] w-full mb-4">
          {data.total} ürün listeleniyor
        </h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
        <ProductCard data={data} />
        </div>
      <Pagination {...paginationProps}  />
      </div>


    </div>


  );
}
