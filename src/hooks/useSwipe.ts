import { useEffect, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const useSwipe = ({ onSwipeLeft, onSwipeRight }: SwipeHandlers) => {
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      startXRef.current = event.touches[0].clientX;
      startYRef.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      const deltaX = endX - startXRef.current;
      const deltaY = endY - startYRef.current;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);
};

export default useSwipe;
