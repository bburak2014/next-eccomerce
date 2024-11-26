// product list
import { Poppins } from 'next/font/google';
import SearchInput from "@/components/SearchInput";
import CategorySelect from "@/components/CategorySelect";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { fetchProducts, ProductResponse, PAGE_LIMIT, fetchCategory } from "@/utils/api";
import Image from 'next/image';
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
		data = await fetchProducts(PAGE_LIMIT, skip, searchQuery, categoryQuery);
		categories = await fetchCategory();
	} catch {
		return (
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold text-red-500">Ürünler Yüklenemedi</h1>
				<p>Lütfen daha sonra tekrar deneyin.</p>
			</div>
		);
	}

	const totalPages = Math.ceil(data.total / PAGE_LIMIT); // Toplam sayfa sayısı

	return (
		<div className={`grid grid-cols-5 gap-8 px-5 py-2 lg:px-20 md:py-8 bg-background h-screen ${poppins.className}`}>
			<div className="col-span-5  md:col-span-2 xl:col-span-1 w-full">
				<SearchInput initialSearchQuery={searchQuery} />
				<CategorySelect initialCategory={categoryQuery} categories={categories} />
			</div>

			<div className="col-span-5 md:col-span-3 xl:col-span-4  gap-7">
				<h3 className="font-bold text-xl text-primary leading-[30px] w-full mb-2">
					{data.total} ürün listeleniyor
				</h3>	
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
				{data.products.map((product) => (
					<Link
						href={"/products/" + product.id}
						key={product.id}
						className="p-4 border rounded shadow-sm"
					>
						<Image src={product.thumbnail} alt={product.title} width={300} height={200} priority />
						<h2 className="font-semibold">{product.title}</h2>
						<p className="text-sm text-gray-600 truncate">{product.description}</p>
						<p className="text-lg font-bold">${product.price}</p>
					</Link>
				))}
				</div>
				<div className="mt-6">
					{/* Önceki sayfa bağlantısı */}
					{currentPage > 1 && (
						<Link
							href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}` : ""}${categoryQuery ? `&category=${categoryQuery}` : ""}`}
							className="justify-self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							aria-label={`Sayfa ${currentPage - 1}`}
						>
							Önceki
						</Link>
					)}
					{/* Sonraki sayfa bağlantısı */}
					{currentPage < totalPages && (
						<Link
							href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}` : ""}${categoryQuery ? `&category=${categoryQuery}` : ""}`}
							className="justify-self-end px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							aria-label={`Sayfa ${currentPage + 1}`}
						>
							Sonraki
						</Link>
					)}
				</div>
			</div>


		</div>


	);
}
