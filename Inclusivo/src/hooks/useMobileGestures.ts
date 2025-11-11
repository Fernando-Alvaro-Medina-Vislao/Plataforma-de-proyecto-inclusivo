// Custom Hook para gestos móviles accesibles
import { useEffect, useRef, useState } from 'react';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Distancia mínima para considerar un swipe
  vibrate?: boolean; // Feedback háptico
}

export function useMobileGestures(config: SwipeConfig) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    vibrate = true,
  } = config;

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const diffX = touchStart.current.x - touchEnd.current.x;
    const diffY = touchStart.current.y - touchEnd.current.y;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    // Determinar la dirección del swipe
    if (absDiffX > absDiffY) {
      // Swipe horizontal
      if (absDiffX > threshold) {
        if (diffX > 0 && onSwipeLeft) {
          onSwipeLeft();
          if (vibrate && 'vibrate' in navigator) {
            navigator.vibrate(50);
          }
        } else if (diffX < 0 && onSwipeRight) {
          onSwipeRight();
          if (vibrate && 'vibrate' in navigator) {
            navigator.vibrate(50);
          }
        }
      }
    } else {
      // Swipe vertical
      if (absDiffY > threshold) {
        if (diffY > 0 && onSwipeUp) {
          onSwipeUp();
          if (vibrate && 'vibrate' in navigator) {
            navigator.vibrate(50);
          }
        } else if (diffY < 0 && onSwipeDown) {
          onSwipeDown();
          if (vibrate && 'vibrate' in navigator) {
            navigator.vibrate(50);
          }
        }
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);
}

// Hook para detectar doble tap
export function useDoubleTap(
  callback: () => void,
  delay: number = 300,
  vibrate: boolean = true
) {
  const [lastTap, setLastTap] = useState<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < delay) {
      callback();
      if (vibrate && 'vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  };

  return handleDoubleTap;
}

// Hook para detectar long press
export function useLongPress(
  callback: () => void,
  duration: number = 500,
  vibrate: boolean = true
) {
  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  const start = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      callback();
      if (vibrate && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }
    }, duration);
  };

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
}
