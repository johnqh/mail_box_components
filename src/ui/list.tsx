import React from 'react';
import { cn } from '../lib/utils';

export interface ListProps {
  /** List items */
  children: React.ReactNode;
  /** List type */
  type?: 'unordered' | 'ordered';
  /** Spacing between items */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Marker/bullet style */
  marker?:
    | 'disc'
    | 'circle'
    | 'square'
    | 'decimal'
    | 'alpha'
    | 'roman'
    | 'none';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

export interface ListItemProps {
  /** List item content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * List Component
 *
 * Semantic list component with consistent styling and spacing options.
 * Supports both ordered and unordered lists with various marker styles.
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 *   <ListItem>Third item</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * <List type="ordered" marker="decimal" spacing="md">
 *   <ListItem>Step one</ListItem>
 *   <ListItem>Step two</ListItem>
 * </List>
 * ```
 */
export const List: React.FC<ListProps> = ({
  children,
  type = 'unordered',
  spacing = 'sm',
  marker,
  size = 'md',
  className,
}) => {
  const Component = type === 'ordered' ? 'ol' : 'ul';

  // Spacing configurations
  const spacingClasses = {
    none: 'space-y-0',
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-4',
  };

  // Size configurations
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Marker configurations
  const getMarkerClass = () => {
    if (marker === 'none') return 'list-none';

    if (type === 'unordered') {
      const unorderedMarkers = {
        disc: 'list-disc',
        circle: 'list-circle',
        square: 'list-square',
        decimal: 'list-disc', // fallback
        alpha: 'list-disc', // fallback
        roman: 'list-disc', // fallback
        none: 'list-none',
      };
      return unorderedMarkers[marker || 'disc'];
    } else {
      const orderedMarkers = {
        decimal: 'list-decimal',
        alpha: 'list-alpha',
        roman: 'list-roman',
        disc: 'list-decimal', // fallback
        circle: 'list-decimal', // fallback
        square: 'list-decimal', // fallback
        none: 'list-none',
      };
      return orderedMarkers[marker || 'decimal'];
    }
  };

  return (
    <Component
      className={cn(
        'ml-6',
        getMarkerClass(),
        spacingClasses[spacing],
        sizeClasses[size],
        'text-gray-900 dark:text-gray-100',
        className
      )}
    >
      {children}
    </Component>
  );
};

/**
 * ListItem Component
 *
 * Individual list item to be used within List component.
 */
export const ListItem: React.FC<ListItemProps> = ({ children, className }) => {
  return <li className={cn('leading-relaxed', className)}>{children}</li>;
};
