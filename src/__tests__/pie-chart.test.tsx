import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PieChart } from '../ui/pie-chart';

describe('PieChart', () => {
  const mockData = [
    { label: 'Chrome', value: 60, color: '#3b82f6' },
    { label: 'Firefox', value: 25, color: '#f59e0b' },
    { label: 'Safari', value: 15, color: '#10b981' },
  ];

  it('renders pie chart with data', () => {
    const { container } = render(<PieChart data={mockData} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders all data labels in legend', () => {
    render(<PieChart data={mockData} showLegend />);

    expect(screen.getByText('Chrome')).toBeInTheDocument();
    expect(screen.getByText('Firefox')).toBeInTheDocument();
    expect(screen.getByText('Safari')).toBeInTheDocument();
  });

  it('hides legend when showLegend is false', () => {
    render(<PieChart data={mockData} showLegend={false} />);

    expect(screen.queryByText('Chrome')).not.toBeInTheDocument();
    expect(screen.queryByText('Firefox')).not.toBeInTheDocument();
    expect(screen.queryByText('Safari')).not.toBeInTheDocument();
  });

  it('shows percentages when showPercentages is true', () => {
    render(<PieChart data={mockData} showPercentages showLegend />);

    // Check for percentage text (60%, 25%, 15%)
    expect(screen.getByText(/60%/)).toBeInTheDocument();
    expect(screen.getByText(/25%/)).toBeInTheDocument();
    expect(screen.getByText(/15%/)).toBeInTheDocument();
  });

  it('renders as donut chart when variant is donut', () => {
    const { container } = render(<PieChart data={mockData} variant='donut' />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Donut charts have a hole in the middle (inner circle)
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders as pie chart when variant is pie', () => {
    const { container } = render(<PieChart data={mockData} variant='pie' />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('applies custom size', () => {
    const { container } = render(<PieChart data={mockData} size={300} />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '300');
  });

  it('applies custom className', () => {
    const { container } = render(
      <PieChart data={mockData} className='custom-chart' />
    );

    const chart = container.querySelector('.custom-chart');
    expect(chart).toBeInTheDocument();
  });

  it('uses default colors when colors are not provided', () => {
    const dataWithoutColors = [
      { label: 'A', value: 40 },
      { label: 'B', value: 30 },
      { label: 'C', value: 30 },
    ];

    const { container } = render(
      <PieChart data={dataWithoutColors} showLegend />
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();

    // Should render with default colors
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('calculates percentages correctly', () => {
    const data = [
      { label: 'First', value: 50 },
      { label: 'Second', value: 30 },
      { label: 'Third', value: 20 },
    ];

    render(<PieChart data={data} showPercentages showLegend />);

    // 50/100 = 50%, 30/100 = 30%, 20/100 = 20%
    expect(screen.getByText(/50%/)).toBeInTheDocument();
    expect(screen.getByText(/30%/)).toBeInTheDocument();
    expect(screen.getByText(/20%/)).toBeInTheDocument();
  });

  it('handles empty data array', () => {
    const { container } = render(<PieChart data={[]} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('handles single data point', () => {
    const singleData = [{ label: 'Only One', value: 100, color: '#3b82f6' }];

    render(<PieChart data={singleData} showLegend />);

    expect(screen.getByText('Only One')).toBeInTheDocument();
  });

  it('renders correct number of slices', () => {
    const { container } = render(<PieChart data={mockData} />);

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(mockData.length);
  });

  it('applies donutHoleSize correctly', () => {
    const { container } = render(
      <PieChart data={mockData} variant='donut' donutHoleSize={60} />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Donut with custom hole size should render
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(mockData.length);
  });

  it('displays values in legend when percentages are shown', () => {
    render(<PieChart data={mockData} showLegend showPercentages />);

    // Should show both label and percentage
    expect(screen.getByText('Chrome')).toBeInTheDocument();
    expect(screen.getByText(/60%/)).toBeInTheDocument();
  });
});
