import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace('#', ''));
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return null;
}
