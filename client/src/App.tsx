import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import ExitIntentModal from "./components/ExitIntentModal";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// ─── All routes are lazily loaded (code-split) ────────────────────────────────
// Home is lazy too — the App shell (React + router + Toaster) is tiny and renders
// the PageLoader spinner instantly while Home.tsx downloads in parallel.
// This removes ~200KB from the initial JS parse cost on first load.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const BlackLabel = lazy(() => import("./pages/BlackLabel"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const HealthOptimization = lazy(() => import("./pages/HealthOptimization"));
const LongevityPrograms = lazy(() => import("./pages/LongevityPrograms"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const FAQ = lazy(() => import("./pages/FAQ"));
const DrEgbert = lazy(() => import("./pages/DrEgbert"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardFinancials = lazy(() => import("./pages/DashboardFinancials"));
const DashboardSEO = lazy(() => import("./pages/DashboardSEO"));
const DashboardLighthouse = lazy(() => import("./pages/DashboardLighthouse"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const FDADisclaimer = lazy(() => import("./pages/FDADisclaimer"));

// Minimal page-level loading skeleton — matches site background
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#051229] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#FBB217] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/about/dr-egbert" component={DrEgbert} />
        <Route path="/services" component={Services} />
        <Route path="/black-label" component={BlackLabel} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/health-optimization" component={HealthOptimization} />
        <Route path="/longevity-programs" component={LongevityPrograms} />
        <Route path="/sitemap" component={Sitemap} />
        <Route path="/faq" component={FAQ} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/financials" component={DashboardFinancials} />
        <Route path="/dashboard/seo" component={DashboardSEO} />
        <Route path="/dashboard/lighthouse" component={DashboardLighthouse} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/fda-disclaimer" component={FDADisclaimer} />
        {/* Legacy redirects */}
        <Route path="/team" component={About} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function PublicExitIntent() {
  const [location] = useLocation();
  // Only show on public pages — not on dashboard or admin routes
  if (location.startsWith("/dashboard")) return null;
  return <ExitIntentModal />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <PublicExitIntent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
