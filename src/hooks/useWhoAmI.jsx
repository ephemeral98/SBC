import { useMemo } from 'react';
import { useEffect } from 'react';
import { localMemory } from '../utils/localMemory';

export const useWhoAmI = () => {
  const user = useMemo(() => {
    const u = localMemory.getItem('auth');
    console.log('u', u);
    return u;
  }, []);

  return { user };
};
