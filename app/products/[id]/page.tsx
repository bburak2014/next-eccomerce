const PRODUCT_DETAILS_API = 'https://dummyjson.com/products';

async function fetchProduct(id: string) {
  const res = await fetch(`${PRODUCT_DETAILS_API}/${id}`);
  if (!res.ok) throw new Error('Ürün bulunamadı!');
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-500 font-bold mt-4">Fiyat: ${product.price}</p>
    </div>
  );
}
