import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.scss";

const Home        = lazy(() => import("./pages/Home"));
const About       = lazy(() => import("./pages/About"));
const Resumes     = lazy(() => import("./pages/Resumes"));
const Portfolios  = lazy(() => import("./pages/Portfolios"));
const Contact     = lazy(() => import("./pages/Contact"));
const Notfound    = lazy(() => import("./pages/Notfound"));

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div className="container mt-5">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resumes />} />
            <Route path="/portfolios" element={<Portfolios />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
