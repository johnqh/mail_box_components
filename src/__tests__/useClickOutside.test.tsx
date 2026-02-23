import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../hooks/useClickOutside';

function TestComponent({ onClickOutside }: { onClickOutside: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div>
      <div ref={ref} data-testid='inside'>
        Inside element
      </div>
      <div data-testid='outside'>Outside element</div>
    </div>
  );
}

describe('useClickOutside', () => {
  it('calls handler when clicking outside the referenced element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={handler} />);

    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler when clicking inside the referenced element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={handler} />);

    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('calls handler on touchstart outside', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={handler} />);

    fireEvent.touchStart(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler on touchstart inside', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={handler} />);

    fireEvent.touchStart(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('calls handler when clicking on document body', () => {
    const handler = vi.fn();
    render(<TestComponent onClickOutside={handler} />);

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('cleans up event listeners on unmount', () => {
    const handler = vi.fn();
    const { unmount } = render(<TestComponent onClickOutside={handler} />);

    unmount();

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();
  });

  it('handles multiple clicks outside', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={handler} />);

    fireEvent.mouseDown(getByTestId('outside'));
    fireEvent.mouseDown(getByTestId('outside'));
    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(3);
  });

  it('does not call handler when clicking a child of the referenced element', () => {
    const handler = vi.fn();

    function NestedComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);

      return (
        <div>
          <div ref={ref} data-testid='parent'>
            <button data-testid='child'>Child button</button>
          </div>
          <div data-testid='outside'>Outside</div>
        </div>
      );
    }

    const { getByTestId } = render(<NestedComponent />);

    fireEvent.mouseDown(getByTestId('child'));
    expect(handler).not.toHaveBeenCalled();
  });
});
