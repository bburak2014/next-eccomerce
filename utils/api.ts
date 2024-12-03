import { fetchData } from "@/utils/inceptor";
import { ProductResponse } from "@/utils/type";
import { cookies } from "next/headers";

// get all products
export async function fetchProducts(
  limit: number,
  skip: number,
  searchQuery?: string,
  category?: string
): Promise<ProductResponse> {
  let endpoint = `/products?limit=${limit}&skip=${skip}`;
  if (searchQuery) {
    endpoint = `/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    endpoint = `/products/category/${category}?limit=${limit}&skip=${skip}`;
  }
  return await fetchData<ProductResponse>(endpoint);
}

// get single product
export async function fetchProduct(id: string) {
  return await fetchData(`/products/${id}`);
}

// get all categories
export async function fetchCategory() {
  return await fetchData(`/products/category-list`);
}

//get auth me
export async function fetchMe() {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token")?.value;

    const response = await fetchData("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Kullanıcı verisi alınamadı:", error);
    throw error;
  }
}
