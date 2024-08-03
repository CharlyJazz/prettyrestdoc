import { useState, useEffect, RefObject } from "react";

function useOnScreen(ref: RefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting);
    },
    {
      root: ref.current,
      threshold: [0, 0.5, 1],
      rootMargin: "0px",
    }
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

export default useOnScreen;
