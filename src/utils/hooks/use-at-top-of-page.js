import { useState, useEffect, useRef } from 'react';

const useAtTopPage = (initalState, limit) => {
  const [scrolled, setScrolled] = useState(initalState);

  const ref = useRef();
  ref.current = scrolled;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > limit;

      if (ref.current !== show) {
        setScrolled(show);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [limit]);

  return scrolled;
};

export default useAtTopPage;
