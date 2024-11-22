//utils/api 

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
  
  export const PAGE_LIMIT = 9;
  
  export async function fetchProducts(limit: number, skip: number, searchQuery?: string, category?: string): Promise<ProductResponse> {
	try {
	  let url = `${process.env.BASE_URL}/products?limit=${limit}&skip=${skip}`;
	  
	  if (searchQuery) {
		url = `${process.env.BASE_URL}/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
	  } else if (category) {
		url = `${process.env.BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
	  }
  
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

 