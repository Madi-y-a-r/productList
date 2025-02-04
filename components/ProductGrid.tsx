'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';
import { RootState } from '@/lib/store/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductGridProps {
  initialData: {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export default function ProductGrid({ initialData }: ProductGridProps) {
  const { ref, inView } = useInView();
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  const sortType = useSelector((state: RootState) => state.products.sortBy);

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage  
  } = useInfiniteQuery({
    queryKey: ['products', searchQuery, sortType],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const products: Product[] = await response.json();

      // Фильтрация и сортировка
      const filteredProducts = searchQuery
        ? products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) 
						
            // product.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : products;

      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortType) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          case 'name-asc':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

      // Логика пагинации
      const pageSize = 10;
      const startIndex = (pageParam - 1) * pageSize;
      const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

      return {
        products: paginatedProducts,
        total: sortedProducts.length,
        page: pageParam,
        totalPages: Math.ceil(sortedProducts.length / pageSize),
      };
    },
    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data?.pages?.length > 0 ? (
        data.pages.flatMap((page, pageIndex) => 
          page?.products?.length
            ? page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : []
        )
      ) : (
        <p key="no-products" className="col-span-full text-center text-red-500">
          No products found
        </p>
      )}

      <div ref={ref} className="col-span-full flex justify-center p-4">
        {isFetchingNextPage && (
          <div className="loading-indicator">Loading more products...</div>
        )}
        {!hasNextPage && (
          <div className="text-gray-900">No more products to load</div>
        )}
      </div>
    </div>
  );
}
