import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb } from '../ui/breadcrumb';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item' },
  ];

  it('renders breadcrumb navigation', () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={items} />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');

    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('renders last item as plain text without link', () => {
    render(<Breadcrumb items={items} />);

    const lastItem = screen.getByText('Item');
    expect(lastItem.closest('a')).not.toBeInTheDocument();
  });

  it('renders separators between items', () => {
    const { container } = render(<Breadcrumb items={items} />);

    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('applies custom separator', () => {
    render(<Breadcrumb items={items} separator='>' />);

    expect(screen.getAllByText('>')).toHaveLength(items.length - 1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Breadcrumb items={items} className='custom-breadcrumb' />
    );

    const breadcrumb = container.querySelector('.custom-breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('handles onClick for clickable items', () => {
    const handleClick = vi.fn();
    const itemsWithClick = [
      { label: 'Home', onClick: handleClick },
      { label: 'Current' },
    ];

    render(<Breadcrumb items={itemsWithClick} />);

    fireEvent.click(screen.getByText('Home'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icons', () => {
    const Icon = () => <span data-testid='icon'>🏠</span>;
    const itemsWithIcons = [
      { label: 'Home', icon: <Icon />, href: '/' },
      { label: 'Current' },
    ];

    render(<Breadcrumb items={itemsWithIcons} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies aria-label for navigation', () => {
    const { container } = render(<Breadcrumb items={items} />);

    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('marks current page with aria-current', () => {
    render(<Breadcrumb items={items} />);

    const currentItem = screen.getByText('Item').closest('[aria-current]');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders collapsed breadcrumb when maxItems is set', () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/1' },
      { label: 'Level 2', href: '/2' },
      { label: 'Level 3', href: '/3' },
      { label: 'Level 4', href: '/4' },
      { label: 'Current' },
    ];

    render(<Breadcrumb items={manyItems} maxItems={4} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('expands collapsed items when ellipsis is clicked', () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/1' },
      { label: 'Level 2', href: '/2' },
      { label: 'Level 3', href: '/3' },
      { label: 'Current' },
    ];

    render(<Breadcrumb items={manyItems} maxItems={3} />);

    const ellipsis = screen.getByText('...');
    fireEvent.click(ellipsis);

    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
  });

  it('renders with custom item renderer', () => {
    const customRender = (item: { label: string }) => (
      <span data-testid='custom-item'>{item.label.toUpperCase()}</span>
    );

    render(<Breadcrumb items={items} renderItem={customRender} />);

    const customItems = screen.getAllByTestId('custom-item');
    expect(customItems).toHaveLength(items.length);
    expect(customItems[0]).toHaveTextContent('HOME');
  });

  it('handles empty items array', () => {
    const { container } = render(<Breadcrumb items={[]} />);

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('renders single item without separator', () => {
    const singleItem = [{ label: 'Only Item' }];

    const { container } = render(<Breadcrumb items={singleItem} />);

    expect(screen.getByText('Only Item')).toBeInTheDocument();
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(0);
  });

  it('applies hover styles to links', () => {
    const { container } = render(<Breadcrumb items={items} />);

    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link.className).toMatch(/hover:/);
    });
  });

  it('disables last item link even if href is provided', () => {
    const itemsWithHref = [
      { label: 'Home', href: '/' },
      { label: 'Current', href: '/current' },
    ];

    render(<Breadcrumb items={itemsWithHref} />);

    const currentItem = screen.getByText('Current');
    expect(currentItem.closest('a')).not.toBeInTheDocument();
  });
});
