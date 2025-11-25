import { useEffect, useRef, useState } from 'react';

/**
 * Hook for optimized image loading with Intersection Observer
 * Implements lazy loading and blur-up technique for better perceived performance
 */
export const useImageOptimization = (src: string, threshold = 0.1) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return { imgRef, imageSrc, isLoaded, handleLoad };
};

/**
 * Hook to prefetch images for better UX
 */
export const usePrefetchImages = (urls: string[]) => {
  useEffect(() => {
    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [urls]);
};
