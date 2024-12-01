//product detail
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProduct } from "@/utils/api";
import ımageGallery from "@/components/ImageGallery";
import ColorCard from "@/components/UI/ColorCard";
import FeaturesCard from "@/components/UI/FeaturesCard";
import CommentsCard from "@/components/CommentsCard";

interface Product {
	title: string;
	description: string;
	price: number;
	images: string[];
	reviews: { reviewerName: string; comment: string, rating: number }[];
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
	const [product]: [Product] = await Promise.all([
		fetchProduct(id) as Promise<Product>,
 	]);

	if (!product) {
		notFound(); // Ürün bulunamazsa 404 sayfasını göster
	}

	return (

		<div className="grid grid-cols-1 md:grid-cols-[36.8%_59.9%] gap-[42px] px-5 py-2 lg:px-20 md:py-14 h-full bg-white font-poppins">
			<ımageGallery data={product?.images} title={product.title} />
			<div className="flex gap-14 flex-col">
				<div className="flex gap-custom-10 flex-col items-start">
					{product.title && <h1 className="text-2.5rem text-black font-bold leading-13">{product.title}</h1>}
					{product.description && <p className="font-normal text-xl leading-1.875 text-gray-custom-1">{product.description}</p>}
				</div>
				 <ColorCard />
				 <FeaturesCard />
				<div>
					{!product?.reviews ? (
						<p className="text-gray-500">Yorumlar alınamadı.</p>
					) : (
						<CommentsCard reviews={product?.reviews} />
						 
					)}

				</div>
			</div>
		</div>

	);
}
