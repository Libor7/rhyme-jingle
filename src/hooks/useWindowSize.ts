import { useState, useEffect, useCallback } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const windowResizeHandler = () => setWindowWidth(window.innerWidth);

  const debounce = useCallback((callback: () => void, wait: number) => {
    let timeoutId: number | undefined;
    
    return (...args: []) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }, []);

  useEffect(() => {
    const debouncedResizeHandler = debounce(windowResizeHandler, 100)
    window.addEventListener("resize", debouncedResizeHandler);

    return () => {
      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, [debounce]);

  return windowWidth;
};

export default useWindowSize;
