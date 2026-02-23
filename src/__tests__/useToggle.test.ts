import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../hooks/useToggle';

describe('useToggle', () => {
  it('initializes with default value (false)', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it('toggles the value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  it('sets value to true with setTrue', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  it('sets value to false with setFalse', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });

  it('setTrue is idempotent when already true', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  it('setFalse is idempotent when already false', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });

  it('sets a specific value with setValue', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });

  it('returns stable function references across renders', () => {
    const { result, rerender } = renderHook(() => useToggle(false));

    const firstSetTrue = result.current.setTrue;
    const firstSetFalse = result.current.setFalse;
    const firstToggle = result.current.toggle;

    rerender();

    expect(result.current.setTrue).toBe(firstSetTrue);
    expect(result.current.setFalse).toBe(firstSetFalse);
    expect(result.current.toggle).toBe(firstToggle);
  });
});
