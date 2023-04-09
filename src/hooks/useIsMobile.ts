import { useEffect, useState } from 'react';

export const isMobileDevice = (userAgent: string): boolean => {
  return Boolean(
    userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
  );
};

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : window.navigator.userAgent;
    setIsMobile(isMobileDevice(userAgent));
  }, []);

  return isMobile;
};

export default useIsMobile;
