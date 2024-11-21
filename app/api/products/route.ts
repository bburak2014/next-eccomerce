export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
  }
  
  export interface ProductResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
  }
  
  
  export async function fetchProducts(limit: number, skip: number, searchQuery?: string): Promise<ProductResponse> {
	try {
	  const url = searchQuery
		? process.env.BASE_URL + `/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
		: process.env.BASE_URL + `/products?limit=${limit}&skip=${skip}`;
  
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