'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortBy } from '@/lib/store/slices/productsSlice';
import { RootState } from '@/lib/store/store';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state: RootState) => state.products);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value as 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';
    dispatch(setSortBy(selectedSort));
  };
  

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <input
          type="search"
          placeholder="Search products..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      
      <div className="sm:w-48">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}
