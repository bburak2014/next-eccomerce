import SearchInput from "@/components/SearchInput";
import CategorySelect from "@/components/CategorySelect";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { fetchProducts, ProductResponse, PAGE_LIMIT } from "@/utils/api";

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
  try {
    data = await fetchProducts(PAGE_LIMIT, skip, searchQuery, categoryQuery);
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
      <CategorySelect initialCategory={categoryQuery} />
      <SearchInput initialSearchQuery={searchQuery}  />
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
            href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}` : ""}${categoryQuery ? `&category=${categoryQuery}` : ""}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label={`Sayfa ${currentPage - 1}`}
          >
            Önceki
          </Link>
        )}
        {/* Sonraki sayfa bağlantısı */}
        {currentPage < totalPages && (
          <Link
            href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}` : ""}${categoryQuery ? `&category=${categoryQuery}` : ""}`}
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
