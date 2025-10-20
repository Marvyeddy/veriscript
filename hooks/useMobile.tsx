import { useEffect, useState } from "react";

export const useMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    handleChange();
    window.addEventListener("resize", handleChange);
    return () => window.removeEventListener("resize", handleChange);
  }, [breakpoint]);

  return isMobile;
};
