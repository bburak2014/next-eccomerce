export async function fetchData<T>(endpoint: string): Promise<T> {
	try {
	  const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
		headers: {
		  'Cache-Control': 's-maxage=60, stale-while-revalidate=30', // Önbellek süresi ve revalidasyon süresi
		},
	  });
  
	  if (!res.ok) {
		throw new Error(`Hata: ${res.status} - ${res.statusText}`);
	  }

	  return await res.json();
	} catch (error) {
	  console.error(`Fetch error (${endpoint}):`, error);
	  throw new Error("Veri alınamadı. Lütfen tekrar deneyin.");
	}
  }
  