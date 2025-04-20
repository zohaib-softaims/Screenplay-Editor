import { useState, useEffect } from "react";
import { debounce } from "lodash";

const useScreenSize = (threshold: number) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = debounce(() => {
      setIsSmallScreen(window.innerWidth < threshold);
    }, 300); 
    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [threshold]);

  return isSmallScreen;
};

export default useScreenSize;
