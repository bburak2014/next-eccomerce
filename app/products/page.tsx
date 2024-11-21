import SearchInput from "@/components/SearchInput";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

// Metadata bilgisi
export const metadata: Metadata = {
  title: "Ürünler",
  description: "Ürün listeleme sayfası",
};

// API verisi için tipler
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Sayfa başına ürün limiti
const PAGE_LIMIT = 9;

// Ürünleri API'den almak için kullanılan fonksiyon
async function fetchProducts(limit: number, skip: number, searchQuery?: string): Promise<ProductResponse> {
  try {
    const url = searchQuery
      ? `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Hata: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ürünler alınırken hata oluştu:", error);
    throw new Error("Ürünler yüklenemedi. Lütfen tekrar deneyin.");
  }
}

// Sayfa bileşeni için gerekli props
interface ProductsPageProps {
  searchParams: { page?: string; search?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const pageParam = searchParams?.page || "1"; // Eğer yoksa "1"
  const currentPage = isNaN(Number(pageParam)) ? 1 : Number(pageParam); // Geçersiz bir parametre için varsayılan 1
  const skip = (currentPage - 1) * PAGE_LIMIT; // Skip değeri hesapla
  const searchQuery = searchParams?.search || ""; // Arama sorgusu

  let data: ProductResponse;

  try {
    data = await fetchProducts(PAGE_LIMIT, skip, searchQuery);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <SearchInput initialSearchQuery={searchQuery} />
      <div className="grid grid-cols-3 gap-4">
        {data.products.map((product) => (
          <Link href={"/products/" + product.id} key={product.id} className="p-4 border rounded shadow-sm">
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600 truncate">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        {/* Önceki sayfa bağlantısı */}
        {currentPage > 1 && (
          <Link
            href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}` : ""}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label={`Sayfa ${currentPage - 1}`}
          >
            Önceki
          </Link>
        )}
        {/* Sonraki sayfa bağlantısı */}
        {currentPage < totalPages && (
          <Link
            href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}` : ""}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label={`Sayfa ${currentPage + 1}`}
          >
            Sonraki
          </Link>
        )}
      </div>
    </div>
  );
}