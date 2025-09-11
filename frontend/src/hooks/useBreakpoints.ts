import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

function getBreakpoint(width: number) {
  if (width >= breakpoints.lg) {
    return 'lg';
  } else if (width >= breakpoints.md) {
    return 'md';
  } else if (width >= breakpoints.sm) {
    return 'sm';
  }
  return 'default';
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export default useBreakpoint;
