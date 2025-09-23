import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../ui/dropdown';

const mockItems = [
  { id: '1', label: 'Item 1', onClick: vi.fn() },
  { id: '2', label: 'Item 2', onClick: vi.fn() },
  { id: '3', label: 'Disabled Item', onClick: vi.fn(), disabled: true },
];

describe('Dropdown Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders trigger element', () => {
    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', () => {
    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('calls item onClick when clicked', () => {
    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    fireEvent.click(screen.getByText('Open Menu'));
    fireEvent.click(screen.getByText('Item 1'));

    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick for disabled items', () => {
    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    fireEvent.click(screen.getByText('Open Menu'));
    const disabledItem = screen.getByText('Disabled Item');
    fireEvent.click(disabledItem);

    expect(mockItems[2].onClick).not.toHaveBeenCalled();
  });

  it('closes dropdown after item selection', () => {
    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Item 1'));
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('renders with different alignments', () => {
    const { rerender } = render(
      <Dropdown
        trigger={<button>Menu</button>}
        items={mockItems}
        align='left'
      />
    );
    expect(screen.getByText('Menu')).toBeInTheDocument();

    rerender(
      <Dropdown
        trigger={<button>Menu</button>}
        items={mockItems}
        align='right'
      />
    );
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Dropdown
        trigger={<button>Menu</button>}
        items={mockItems}
        className='custom-dropdown'
      />
    );

    expect(container.firstChild).toHaveClass('custom-dropdown');
  });
});
