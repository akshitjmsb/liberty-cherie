'use client';

import React from 'react';
import Image from 'next/image';

interface CartItemProps {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  name,
  variant,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <h3 className="cart-item-name">{name}</h3>
        <p className="cart-item-variant">{variant}</p>
        <p className="cart-item-price">${price.toFixed(2)}</p>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="quantity-selector">
            <button
              onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(id)}
            className="cart-item-remove"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
