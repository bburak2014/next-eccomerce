import { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.id);
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

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  // Ürün detaylarını render et
  return (
    <div className="container mx-auto p-4">
      {product.title && <h1 className="text-3xl font-bold">{product.title}</h1>}
      {product.description && <p className="text-gray-700">{product.description}</p>}
      {product.price && <p className="text-green-500 font-bold mt-4">Fiyat: ${product.price}</p>}
    </div>
  );
}
