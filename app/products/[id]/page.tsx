//product detail
import { notFound } from "next/navigation";
import { fetchProduct } from "@/utils/api";
import ımageGallery from "@/components/ImageGallery";
import ColorCard from "@/components/UI/ColorCard";
import FeaturesCard from "@/components/UI/FeaturesCard";
import CommentsCard from "@/components/CommentsCard";
import CartInfo from "@/components/CartInfo";
import { Metadata } from "next";

interface Product {
	title: string;
	description: string;
	price: number;
	images: string[];
	thumbnail: string;
	reviews: { reviewerName: string; comment: string, rating: number }[];
}

 
  export async function generateMetadata({ params }: {params:{id:string}}): Promise<Metadata> {
	const { id } = await params;
	if (!id) {
	  throw new Error("ID parametresi eksik.");
	}
	const product = await fetchProduct(id) as Product;
  
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
  
  export default async function ProductDetailPage({ params }: {params:{id:string}}) {
	const { id } = await params;
  
	if (!id) {
	  throw new Error("ID parametresi eksik.");
	}
  
	const product = await fetchProduct(id) as Product;
  
	if (!product) {
	  notFound();
	}
  
	const productProps = {
	  productId: id,
	  price: product.price,
	  title: product.title,
	  description: product.description,
	  thumbnail: product.thumbnail,
	};
  
	return (
	<>
	  <div className="grid grid-cols-1 md:grid-cols-[36.8%_59.9%] gap-[42px] px-5 py-2 lg:px-20 md:py-14 h-full bg-white font-poppins">
		<ımageGallery data={product.images} title={product.title} />
		<div className="flex gap-14 flex-col">
		  <h1 className="text-2.5rem text-black font-bold leading-13">{product.title}</h1>
		  <p className="font-normal text-xl leading-1.875 text-gray-custom-1">
			{product.description}
		  </p>
		  <ColorCard />
		  <FeaturesCard />
		  {product.reviews ? (
			<CommentsCard reviews={product.reviews} />
		  ) : (
			<p className="text-gray-500">Yorumlar alınamadı.</p>
		  )}
		</div>
	  </div>
	  <CartInfo {...productProps} />

	  </>
	);
  }
  
  
