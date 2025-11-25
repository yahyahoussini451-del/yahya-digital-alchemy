import { useEffect } from 'react';
import { reportWebVitals } from '@/utils/performance';

/**
 * Hook to monitor and report Core Web Vitals
 * Automatically tracks LCP, INP, CLS, FCP, TTFB
 */
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamically import web-vitals to avoid bundle bloat
    const loadWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
        onCLS(reportWebVitals as any);
        onINP(reportWebVitals as any); // INP replaced FID in web-vitals v3
        onFCP(reportWebVitals as any);
        onLCP(reportWebVitals as any);
        onTTFB(reportWebVitals as any);
      } catch (error) {
        console.warn('Web Vitals library not available');
      }
    };

    loadWebVitals();
  }, []);
};

/**
 * Hook to add performance marks for custom metrics
 */
export const usePerformanceMark = (name: string) => {
  useEffect(() => {
    performance.mark(`${name}-start`);
    
    return () => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      }
    };
  }, [name]);
};
