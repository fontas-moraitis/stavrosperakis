import { renderHook } from '@testing-library/react';
import useSwipe from '../src/hooks/useSwipe';

describe('useSwipe', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('should add touchstart and touchend event listeners', () => {
    renderHook(() => useSwipe({ onSwipeLeft: jest.fn(), onSwipeRight: jest.fn() }));

    expect(addEventListenerSpy).toHaveBeenCalledTimes(3);
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
  });

  test('should remove touchstart and touchend event listeners on unmount', () => {
    const { unmount } = renderHook(() => useSwipe({ onSwipeLeft: jest.fn(), onSwipeRight: jest.fn() }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
  });

  test('should call onSwipeLeft when swiping left', () => {
    const onSwipeLeftMock = jest.fn();
    const onSwipeRightMock = jest.fn();

    renderHook(() => useSwipe({ onSwipeLeft: onSwipeLeftMock, onSwipeRight: onSwipeRightMock }));

    const touchStartEvent = new TouchEvent('touchstart', { touches: [{ clientX: 100, clientY: 100 }] });
    const touchEndEvent = new TouchEvent('touchend', { changedTouches: [{ clientX: 50, clientY: 100 }] });

    document.dispatchEvent(touchStartEvent);
    document.dispatchEvent(touchEndEvent);

    expect(onSwipeLeftMock).toHaveBeenCalledTimes(1);
    expect(onSwipeRightMock).not.toHaveBeenCalled();
  });

  test('should call onSwipeRight when swiping right', () => {
    const onSwipeLeftMock = jest.fn();
    const onSwipeRightMock = jest.fn();

    renderHook(() => useSwipe({ onSwipeLeft: onSwipeLeftMock, onSwipeRight: onSwipeRightMock }));

    const touchStartEvent = new TouchEvent('touchstart', { touches: [{ clientX: 100, clientY: 100 }] });
    const touchEndEvent = new TouchEvent('touchend', { changedTouches: [{ clientX: 150, clientY: 100 }] });

    document.dispatchEvent(touchStartEvent);
    document.dispatchEvent(touchEndEvent);

    expect(onSwipeRightMock).toHaveBeenCalledTimes(1);
    expect(onSwipeLeftMock).not.toHaveBeenCalled();
  });
});
