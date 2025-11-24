import React from 'react';
import { cn } from './lib/utils';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartSummaryProps {
  /** Cart items */
  items: CartItem[];
  /** Shipping cost */
  shipping?: number;
  /** Tax amount */
  tax?: number;
  /** Discount amount */
  discount?: number;
  /** Currency symbol */
  currency?: string;
  /** Checkout handler */
  onCheckout?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * CartSummary Component
 *
 * Shopping cart summary with totals.
 * Shows items, subtotal, shipping, tax, and final total.
 *
 * @example
 * ```tsx
 * <CartSummary
 *   items={[
 *     { id: '1', name: 'Product A', price: 29.99, quantity: 2 },
 *     { id: '2', name: 'Product B', price: 49.99, quantity: 1 }
 *   ]}
 *   shipping={5.99}
 *   tax={8.50}
 *   discount={10.00}
 *   onCheckout={() => proceedToCheckout()}
 * />
 * ```
 */
export const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  shipping = 0,
  tax = 0,
  discount = 0,
  currency = '$',
  onCheckout,
  className,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping + tax - discount;

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6',
        className
      )}
    >
      <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
        Order Summary
      </h2>

      {/* Items */}
      <div className='space-y-3 mb-4 max-h-64 overflow-y-auto'>
        {items.map(item => (
          <div key={item.id} className='flex gap-3'>
            {item.image && (
              <div className='w-16 h-16 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover'
                />
              </div>
            )}
            <div className='flex-1 min-w-0'>
              <p className='font-medium text-gray-900 dark:text-white truncate'>
                {item.name}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Qty: {item.quantity}
              </p>
            </div>
            <div className='text-right'>
              <p className='font-semibold text-gray-900 dark:text-white'>
                {currency}
                {(item.price * item.quantity).toFixed(2)}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {currency}
                {item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className='border-t border-gray-200 dark:border-gray-700 my-4' />

      {/* Summary lines */}
      <div className='space-y-2 mb-4'>
        <div className='flex justify-between text-gray-700 dark:text-gray-300'>
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        {shipping > 0 && (
          <div className='flex justify-between text-gray-700 dark:text-gray-300'>
            <span>Shipping</span>
            <span>
              {currency}
              {shipping.toFixed(2)}
            </span>
          </div>
        )}

        {tax > 0 && (
          <div className='flex justify-between text-gray-700 dark:text-gray-300'>
            <span>Tax</span>
            <span>
              {currency}
              {tax.toFixed(2)}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className='flex justify-between text-green-600 dark:text-green-400'>
            <span>Discount</span>
            <span>
              -{currency}
              {discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className='border-t border-gray-200 dark:border-gray-700 my-4' />

      {/* Total */}
      <div className='flex justify-between items-center mb-4'>
        <span className='text-lg font-bold text-gray-900 dark:text-white'>
          Total
        </span>
        <span className='text-2xl font-bold text-gray-900 dark:text-white'>
          {currency}
          {total.toFixed(2)}
        </span>
      </div>

      {/* Checkout button */}
      {onCheckout && (
        <button
          onClick={onCheckout}
          className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold'
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
