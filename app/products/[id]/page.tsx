//product detail
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProduct, fetchComments } from "@/utils/api";
import ProductImage from "@/components/ProductImage";

interface Product {
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface Comment {
  user: {
    fullName: string;
  };
  body: string;
  likes: number;
}



// Meta verileri oluştururken çekilen ürün verisini kullan
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params; // 'await' kullanmak gerekiyor.

  const product = await fetchProduct(id) as Product; // Ürün verisini bir kez çek

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
  const { id } = await params; // 'await' kullanmak gerekiyor.	
  const [product, comments]: [Product, Comment] = await Promise.all([
    fetchProduct(id) as Promise<Product>,
    fetchComments(id) as Promise<Comment>,
  ]);

  if (!product) {
    notFound(); // Ürün bulunamazsa 404 sayfasını göster
  }
    return (
    <div className="h-100 px-20 py-14 ">
      <div className="grid grid-cols-5 gap-7">
        <div className="col-span-2">
          {
            product.images && product.images.map((image, index) => (
              <ProductImage
                key={index}
                src={image}
                alt={product.title}
                quality={30}
                width={200}
                height={200}
              />
            ))
          }
       
        </div>
        <div className="col-span-3"></div>
      </div>
      {product.title && <h1 className="text-3xl font-bold">{product.title}</h1>}
      {product.description && <p className="text-gray-700">{product.description}</p>}
      {product.price && <p className="text-green-500 font-bold mt-4">Fiyat: ${product.price}</p>}

       <div className="mt-8">
        <h2 className="text-xl font-semibold">Yorumlar</h2>
        {!comments ? (
          <p className="text-gray-500">Yorumlar alınamadı.</p>
        ) : (
          <div className="mt-4 p-4 border border-gray-200 rounded-md">
            {comments.user.fullName && <p className="font-semibold">{comments.user.fullName}</p>}
            {comments.body && <p className="text-gray-600">{comments.body}</p>}
            {comments.likes && <p className="text-gray-500 mt-2">Likes: {comments.likes}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
