'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { useState } from 'react';
import Cart from './Cart';

export default function Header() {
  const { totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">E-Commerce Store</h1>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-semibold">{totalQuantity}</span>
            <span className="hidden sm:inline">
              (${totalAmount.toFixed(2)})
            </span>
          </button>
        </div>
      </div>

      {isCartOpen && (
        <Cart onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
}
