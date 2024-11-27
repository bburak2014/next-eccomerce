import { fetchData } from "@/utils/inceptor";
import { ProductResponse } from "@/utils/type";


// Ürünler için API çağrısı
export async function fetchProducts(limit: number, skip: number, searchQuery?: string, category?: string): Promise<ProductResponse> {
	let endpoint = `/products?limit=${limit}&skip=${skip}`;
	if (searchQuery) {
		endpoint = `/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
	} else if (category) {
		endpoint = `/products/category/${category}?limit=${limit}&skip=${skip}`;
	}
	return await fetchData<ProductResponse>(endpoint);
}

// Tek bir ürünü almak için API çağrısı
export async function fetchProduct(id: string) {
	return await fetchData(`/products/${id}`);
}

// Yorumları çekmek için API çağrısı
export async function fetchComments(id: string) {
	return await fetchData(`/comments/${id}`);
}

// Kategorileri çekmek için API çağrısı
export async function fetchCategory() {
	return await fetchData(`/products/category-list`);
}
