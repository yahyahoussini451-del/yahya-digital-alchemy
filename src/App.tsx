import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load admin and secondary pages for code splitting
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const PostEditor = lazy(() => import("./pages/PostEditor"));
const AdminApps = lazy(() => import("./pages/AdminApps"));
const AppEditor = lazy(() => import("./pages/AppEditor"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const MigrateApps = lazy(() => import("./pages/MigrateApps"));
const AdminCertifications = lazy(() => import("./pages/AdminCertifications"));
const CertificationEditor = lazy(() => import("./pages/CertificationEditor"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const TestimonialEditor = lazy(() => import("./pages/TestimonialEditor"));

// Optimize React Query with performance-focused defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/post/:id" element={<PostEditor />} />
            <Route path="/admin/apps" element={<AdminApps />} />
            <Route path="/admin/app/:id" element={<AppEditor />} />
            <Route path="/admin/certifications" element={<AdminCertifications />} />
            <Route path="/admin/certification/:id" element={<CertificationEditor />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/testimonial/:id" element={<TestimonialEditor />} />
            <Route path="/migrate-apps" element={<MigrateApps />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
