import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import PostEditor from "./pages/PostEditor";
import AdminApps from "./pages/AdminApps";
import AppEditor from "./pages/AppEditor";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import MigrateApps from "./pages/MigrateApps";
import AdminCertifications from "./pages/AdminCertifications";
import CertificationEditor from "./pages/CertificationEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/post/:id" element={<PostEditor />} />
        <Route path="/admin/apps" element={<AdminApps />} />
        <Route path="/admin/app/:id" element={<AppEditor />} />
        <Route path="/admin/certifications" element={<AdminCertifications />} />
        <Route path="/admin/certification/:id" element={<CertificationEditor />} />
        <Route path="/migrate-apps" element={<MigrateApps />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
