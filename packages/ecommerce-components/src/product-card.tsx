import React from 'react';
import { cn } from '@sudobility/components';

export interface ProductCardProps {
  /** Product image URL */
  image: string;
  /** Product name */
  name: string;
  /** Product price */
  price: number;
  /** Original price (for discounts) */
  originalPrice?: number;
  /** Product rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge text */
  badge?: string;
  /** Badge variant */
  badgeVariant?: 'sale' | 'new' | 'featured';
  /** Click handler */
  onClick?: () => void;
  /** Add to cart handler */
  onAddToCart?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * ProductCard Component
 *
 * Product display card for e-commerce.
 * Shows image, name, price, rating, and actions.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   image="/product.jpg"
 *   name="Premium Headphones"
 *   price={99.99}
 *   originalPrice={149.99}
 *   rating={4.5}
 *   reviewCount={128}
 *   badge="Sale"
 *   badgeVariant="sale"
 *   onAddToCart={() => addToCart(product)}
 * />
 * ```
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  badgeVariant = 'new',
  onClick,
  onAddToCart,
  className,
}) => {
  const badgeStyles = {
    sale: 'bg-red-500',
    new: 'bg-green-500',
    featured: 'bg-blue-500',
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        'group bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className='relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {/* Badge */}
        {badge && (
          <div
            className={cn(
              'absolute top-2 left-2 px-2 py-1 rounded text-white text-xs font-semibold',
              badgeStyles[badgeVariant]
            )}
          >
            {badge}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className='absolute top-2 right-2 px-2 py-1 rounded bg-orange-500 text-white text-xs font-semibold'>
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-4'>
        {/* Name */}
        <h3 className='font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
          {name}
        </h3>

        {/* Rating */}
        {rating !== undefined && (
          <div className='flex items-center gap-2 mb-2'>
            <div className='flex items-center'>
              {[1, 2, 3, 4, 5].map(star => (
                <svg
                  key={star}
                  className={cn(
                    'w-4 h-4',
                    star <= rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  )}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className='flex items-center gap-2 mb-3'>
          <span className='text-2xl font-bold text-gray-900 dark:text-white'>
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className='text-sm text-gray-500 dark:text-gray-400 line-through'>
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        {onAddToCart && (
          <button
            onClick={e => {
              e.stopPropagation();
              onAddToCart();
            }}
            className='w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
