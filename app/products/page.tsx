// product list
import { Poppins } from 'next/font/google';
import SearchInput from "@/components/SearchInput";
import CategorySelect from "@/components/CategorySelect";
import { Metadata } from "next";
import React from "react";
import { fetchProducts, fetchCategory } from "@/utils/api";
import { PAGE_LIMIT } from "@/utils/helper";
import { ProductResponse } from '@/utils/type';
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

// Metadata Info
export const metadata: Metadata = {
	title: "Ürünler",
	description: "Ürün listeleme sayfası",
};

// Products Page
interface ProductsPageProps {
	searchParams: { page?: string; search?: string; category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
	const { page, search, category } = await searchParams;

	const pageParam = page || "1"; // else default 1
	const currentPage = isNaN(Number(pageParam)) ? 1 : Number(pageParam); 
	const skip = (currentPage - 1) * PAGE_LIMIT; // calculate skip
	const searchQuery = search || ""; // search query
	const categoryQuery = category || ""; // search category

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

	const totalPages = Math.ceil(data.total / PAGE_LIMIT); // Total pages

	const paginationProps = {
		currentPage,
		totalPages,
		searchQuery,
		categoryQuery,
	}
	return (
		<div className={`grid grid-cols-10 gap-8 px-5 py-2 lg:px-20 md:py-8 bg-background  ${poppins.className}`}>
			<div className="col-span-10 md:col-span-4 lg:col-span-3 xl:col-span-2 w-full">
				<div className='sticky top-[126px]'>
					<SearchInput initialSearchQuery={searchQuery} />
					<CategorySelect initialCategory={categoryQuery} categories={categories} />
				</div>
			</div>

			<div className="col-span-10 md:col-span-6 lg:col-span-7 xl:col-span-8  gap-7">
				{data.total && <h3 className="font-bold text-xl text-primary leading-[30px] w-full mb-4">
					{data.total} ürün listeleniyor
				</h3>}
				<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
					<ProductCard data={data} />
				</div>
				<Pagination {...paginationProps} />
			</div>


		</div>


	);
}
