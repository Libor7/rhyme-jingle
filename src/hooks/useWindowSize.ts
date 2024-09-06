/** LIBRARIES */
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const windowResizeHandler = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, []);

  return {
    isSmall: windowWidth <= 480,
    isMedium: windowWidth > 480 && windowWidth < 900,
    isLarge: windowWidth >= 900,
  };
};

export default useWindowSize;
