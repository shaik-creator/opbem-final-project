import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the main content area to the top whenever the route changes.
 * Targets the main scrollable element inside AppLayout.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll main content area to top on route change
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}
