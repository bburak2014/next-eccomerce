//import ProductCard from '@/components/ProductCard';
//import ProductFilter from '@/components/ProductFilter';
//import Pagination from '@/components/Pagination';

const PRODUCTS_API = 'https://dummyjson.com/products';

async function fetchProducts(page: number = 1) {
  const res = await fetch(`${PRODUCTS_API}?limit=9&skip=${(page - 1) * 9}`);
  if (!res.ok) throw new Error('Ürünler getirilemedi!');
  return res.json();
}

export default async function ProductsPage() {
  const productsData = await fetchProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      {/*<ProductFilter />*/}
      {/*<div className="grid grid-cols-3 gap-4">
        {productsData.products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination total={productsData.total} />*/}
    </div>
  );
}
