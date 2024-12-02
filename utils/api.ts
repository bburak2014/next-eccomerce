import { fetchData } from "@/utils/inceptor";
import { ProductResponse } from "@/utils/type";
import { cookies } from "next/headers";

// Ürünler için API çağrısı
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

// Tek bir ürünü almak için API çağrısı
export async function fetchProduct(id: string) {
  return await fetchData(`/products/${id}`);
}

// Kategorileri çekmek için API çağrısı
export async function fetchCategory() {
  return await fetchData(`/products/category-list`);
}

//profile bilgileri
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

// cart bilgisi  almak için API çağrısı
export async function fetchCartByUser(userID: string) {
  return await fetchData(`/carts/user/${userID}`);
}

export async function postCart(userID: number, products: Array<{ id: number; quantity: number }>) {
	try {
	  const response = await fetch(`${process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL}/carts/add`, {
		method: "POST",
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userID, products }),
	  });
  
	  if (!response.ok) {
		throw new Error(`Hata: ${response.status} - ${response.statusText}`);
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error("Sepet eklenirken hata oluştu:", error);
	  throw error;
	}
  }