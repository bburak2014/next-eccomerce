export interface Product {
    id: number;
    thumbnail: string;
    title: string;
    category: string;
    price: number;
	rating: number;
}


export interface ProductResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}