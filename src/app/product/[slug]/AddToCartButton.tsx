'use client';

import { useState } from 'react';
import { ShoppingBag, Minus, Plus, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);

    // Show success state briefly, then open cart
    setTimeout(() => {
      openCart();
      setAdded(false);
    }, 500);
  };

  const incrementQuantity = () => {
    if (product.stock_quantity && quantity < product.stock_quantity) {
      setQuantity(q => q + 1);
    } else if (!product.stock_quantity) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  if (!product.in_stock) {
    return (
      <button
        disabled
        className="w-full py-4 px-6 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-charcoal font-medium">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-3 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            disabled={product.stock_quantity ? quantity >= product.stock_quantity : false}
            className="p-3 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
          added
            ? 'bg-secondary text-white'
            : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg'
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
