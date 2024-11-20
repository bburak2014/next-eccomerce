import { Metadata } from "next";
import Link from "next/link";

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
async function getProducts(limit: number, skip: number): Promise<ProductResponse> {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
      cache: "no-store", // ISR yerine her sorguda güncel veri çekmek için
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
  searchParams: { page?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const currentPage = parseInt(searchParams?.page || "1") || 10; // Sayfa numarasını al
  console.log(currentPage)
  const skip = (currentPage - 1) * PAGE_LIMIT; // Skip değeri hesapla

  let data: ProductResponse;

  try {
    // API'den veri çek
    data = await getProducts(PAGE_LIMIT, skip);
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
      <div className="grid grid-cols-3 gap-4">
        {data.products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow-sm">
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600 truncate">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        {/* Önceki sayfa bağlantısı */}
        {currentPage > 1 && (
          <Link
            href={`/products?page=${currentPage - 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label={`Sayfa ${currentPage - 1}`}
          >
            Önceki
          </Link>
        )}
        {/* Sonraki sayfa bağlantısı */}
        {currentPage < totalPages && (
          <Link
            href={`/products?page=${currentPage + 1}`}
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

