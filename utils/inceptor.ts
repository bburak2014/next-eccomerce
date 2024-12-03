export async function fetchData<T>(
	endpoint: string,
	options?: {
	  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // HTTP method
	  headers?: Record<string, string>; // HTTP headers
	  body?: Record<string, unknown> | null; // JSON body
	  includeCredentials?: boolean; // Cookie include
	}
  ): Promise<T> {
	const {
	  method = 'GET', // default  GET
	  headers = {},
	  body = null,
	  includeCredentials = false,
	} = options || {};
  
	try {
	  const res = await fetch(`${process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
		method,
		headers: {
		  'Content-Type': 'application/json',
		  'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
		  ...headers,
		},
		body: body ? JSON.stringify(body) : null,
		credentials: includeCredentials ? 'include' : 'same-origin',
	  });
  
	  if (!res.ok) {
		throw new Error(`Hata: ${res.status} - ${res.statusText}`);
	  }
  
	  return await res.json();
	} catch (error) {
	  console.error(`Fetch error (${endpoint}):`, error);
	  throw new Error('Veri alınamadı. Lütfen tekrar deneyin.');
	}
  }
  