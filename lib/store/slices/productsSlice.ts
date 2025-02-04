import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  searchQuery: string;
  sortBy: SortOption;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  sortBy: 'price-asc',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = sortProducts(
        filterProducts(action.payload, state.searchQuery),
        state.sortBy
      );
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
			console.log("🔍 setSearchQuery вызван с:", action.payload);
			state.searchQuery = action.payload;
			state.filteredItems = sortProducts(
				filterProducts(state.items, action.payload),
				state.sortBy
			);
		},

    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.filteredItems = sortProducts(state.filteredItems, action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Вспомогательные функции для фильтрации и сортировки
function filterProducts(products: Product[], searchQuery: string): Product[] {
  if (!searchQuery) return products;
  
  const query = searchQuery.toLowerCase();
  return products.filter(
    product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedProducts;
  }
}

export const {
  setProducts,
  setSearchQuery,
  setSortBy,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
