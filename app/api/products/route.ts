import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

export async function GET(request: Request) {
  try {
    // Парсим параметры запроса
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search')?.toLowerCase() || '';

    // Запрашиваем данные у My JSON Server
    const res = await fetch('https://my-json-server.typicode.com/Madi-y-a-r/mockData/products', {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const products: Product[] = await res.json();

    // Фильтрация по поисковому запросу
    let filteredProducts = products;
    if (search) {
      filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(search)
      );
    }

    // Пагинация
    const start = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(start, start + limit);

    return NextResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
