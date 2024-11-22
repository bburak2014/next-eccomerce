import { Metadata } from "next";
import { notFound } from "next/navigation";

// Ürün verisini çekmek için fonksiyon
async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Yorumları çekmek için fonksiyon
async function fetchComments(id: string) {
  const res = await fetch(`https://dummyjson.com/comments/${id}`);
  if (!res.ok) return [];
  return res.json();
}

// Meta verileri oluştururken çekilen ürün verisini kullan
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const {id} = await params; // 'await' kullanmak gerekiyor.

	const product = await fetchProduct(id); // Ürün verisini bir kez çek

  // Eğer ürün bulunamazsa, ürün bulunamadı meta verilerini döndür
  if (!product) {
    return {
      title: "Ürün Bulunamadı",
      description: "Ürün bulunamadı",
    };
  }

  return {
    title: product.title || "Ürün Detayları",
    description: product.description || "Ürün detay sayfası",
  };
}

// Ürün detay sayfası bileşeni
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
	const {id} = await params; // 'await' kullanmak gerekiyor.	
	const product = await fetchProduct(id); // Ürün verisini bir kez çek
	const comments = await fetchComments(id);

	if (!product) {
    notFound(); // Ürün bulunamazsa 404 sayfasını göster
  }


  return (
    <div className="container mx-auto p-4">
      {product.title && <h1 className="text-3xl font-bold">{product.title}</h1>}
      {product.description && <p className="text-gray-700">{product.description}</p>}
      {product.price && <p className="text-green-500 font-bold mt-4">Fiyat: ${product.price}</p>}

      {/* Yorumları render et */}
	  <div className="mt-8">
        <h2 className="text-xl font-semibold">Yorumlar</h2>
        {!comments ? (
          <p className="text-gray-500">Yorumlar alınamadı.</p>
        ) : (
          <div className="mt-4 p-4 border border-gray-200 rounded-md">
            <p className="font-semibold">{comments.user.fullName}</p>
            <p className="text-gray-600">{comments.body}</p>
            <p className="text-gray-500 mt-2">Likes: {comments.likes}</p>
          </div>
        )}
      </div>    </div>
  );
}
