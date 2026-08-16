import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home/Home";
import PageLoader from "./components/ui/PageLoader";

// Secondary pages are code-split — the landing page stays in the main bundle.
const Features = lazy(() => import("./pages/Features/Features"));
const UseCases = lazy(() => import("./pages/UseCases/UseCases"));
const LifeScore = lazy(() => import("./pages/LifeScore/LifeScore"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const About = lazy(() => import("./pages/About/About"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const GetStarted = lazy(() => import("./pages/GetStarted/GetStarted"));
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
