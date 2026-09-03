import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home/Home";
import PageLoader from "./components/ui/PageLoader";

// Secondary pages are code-split — the landing page stays in the main bundle.
const Features = lazy(() => import("./pages/Features/Features"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail/FeatureDetail"));
const UseCases = lazy(() => import("./pages/UseCases/UseCases"));
const LifeScore = lazy(() => import("./pages/LifeScore/LifeScore"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const About = lazy(() => import("./pages/About/About"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const GetStarted = lazy(() => import("./pages/GetStarted/GetStarted"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms/Terms"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          path="features"
          element={
            <Suspense fallback={<PageLoader />}>
              <Features />
            </Suspense>
          }
        />
        {/* Legacy feature slugs → canonical routes */}
        <Route
          path="features/memory-os"
          element={<Navigate to="/features/memory" replace />}
        />
        <Route
          path="features/tasks-plan"
          element={<Navigate to="/features/tasks" replace />}
        />
        <Route
          path="features/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <FeatureDetail />
            </Suspense>
          }
        />
        <Route
          path="use-cases"
          element={
            <Suspense fallback={<PageLoader />}>
              <UseCases />
            </Suspense>
          }
        />
        <Route
          path="lifescore"
          element={
            <Suspense fallback={<PageLoader />}>
              <LifeScore />
            </Suspense>
          }
        />
        <Route
          path="pricing"
          element={
            <Suspense fallback={<PageLoader />}>
              <Pricing />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="get-started"
          element={
            <Suspense fallback={<PageLoader />}>
              <GetStarted />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        {/* Legacy alias */}
        <Route path="privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route
          path="terms"
          element={
            <Suspense fallback={<PageLoader />}>
              <Terms />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
