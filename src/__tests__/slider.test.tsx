import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from '../forms/inputs/slider';

/** The filled bar is the only element carrying an inline width. */
function fill(container: HTMLElement): HTMLElement {
  const bars = Array.from(
    container.querySelectorAll<HTMLElement>('div[style*="width"]')
  );
  return bars[bars.length - 1];
}

describe('Slider', () => {
  it('fills from the left by default', () => {
    const { container } = render(
      <Slider value={25} onChange={vi.fn()} min={0} max={100} />
    );
    expect(fill(container).style.left).toBe('0%');
    expect(fill(container).style.width).toBe('25%');
  });

  describe('origin', () => {
    // A bipolar control -- pan, balance, a detune trim -- reads as distance
    // from centre and in which direction. With a left-anchored fill, a centred
    // pan looks identical to a volume at half, which says the opposite.
    it('grows right from the origin for a positive value', () => {
      const { container } = render(
        <Slider value={0.5} onChange={vi.fn()} min={-1} max={1} origin={0} />
      );
      expect(fill(container).style.left).toBe('50%');
      expect(fill(container).style.width).toBe('25%');
    });

    it('grows left from the origin for a negative value', () => {
      const { container } = render(
        <Slider value={-0.5} onChange={vi.fn()} min={-1} max={1} origin={0} />
      );
      expect(fill(container).style.left).toBe('25%');
      expect(fill(container).style.width).toBe('25%');
    });

    it('shows nothing filled when the value sits on the origin', () => {
      const { container } = render(
        <Slider value={0} onChange={vi.fn()} min={-1} max={1} origin={0} />
      );
      expect(fill(container).style.width).toBe('0%');
    });

    it('clamps an origin outside the range rather than running off the track', () => {
      const { container } = render(
        <Slider value={0} onChange={vi.fn()} min={0} max={10} origin={-99} />
      );
      expect(fill(container).style.left).toBe('0%');
    });
  });
});
