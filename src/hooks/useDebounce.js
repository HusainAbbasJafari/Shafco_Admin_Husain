import { useRef, useEffect, useCallback } from 'react';

export function useDebounce(callback, delay) {
  const timeoutRef = useRef();

  const debouncedFunction = useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Optional: clean up on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debouncedFunction;
}
