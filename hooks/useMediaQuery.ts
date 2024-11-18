'use client';

import { useMemo, useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const mediaQuery = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia(query) : null),
    [query],
  );

  const [match, setMatch] = useState(() => mediaQuery?.matches || false);

  useEffect(() => {
    if (!mediaQuery) return;

    const handleChange = (event: MediaQueryListEvent) => setMatch(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mediaQuery]);

  return match;
};

export default useMediaQuery;
