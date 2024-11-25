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
			cache: 'no-store',
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


// Ürün verisini çekmek için fonksiyon
export async function fetchProduct(id: string) {
	const res = await fetch(`${process.env.BASE_URL}/products/${id}`);
	if (!res.ok) return null;
	return res.json();
}

// Yorumları çekmek için fonksiyon
export async function fetchComments(id: string) {
	const res = await fetch(`https://dummyjson.com/comments/${id}`);
	if (!res.ok) return [];
	return res.json();
}
