/**
 * Skip to Content Link - WCAG 2.1 AA Requirement
 * Allows keyboard users to bypass navigation and jump directly to main content
 */
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
};
