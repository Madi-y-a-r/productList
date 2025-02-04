import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';

export const metadata = {
  title: 'Products | E-commerce Store',
  description: 'Browse our collection of products',
};

async function getProducts(page = 1, limit = 10) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  if (!API_URL) {
    console.error('API URL is not defined');
    return {
      products: [],
      total: 0,
      page: 1,
      totalPages: 0
    };
  }

  try {
    const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store' // Отключаем кеширование для динамического запроса
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return {
      products: Array.isArray(data.products) ? data.products : [],
      total: data.total ?? 0,
      page: page,
      totalPages: Math.ceil((data.total ?? 0) / limit)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      total: 0,
      page: 1,
      totalPages: 0
    };
  }
}

export default async function ProductsPage() {
  const initialData = await getProducts();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        <ProductGrid initialData={initialData} />
      </main>
    </>
  );
}
