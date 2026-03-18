import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

const Home        = lazy(() => import("./pages/Home"));
const About       = lazy(() => import("./pages/About"));
const Resumes     = lazy(() => import("./pages/Resumes"));
const Portfolios  = lazy(() => import("./pages/Portfolios"));
const Blogs       = lazy(() => import("./pages/Blogs"));
const Contact     = lazy(() => import("./pages/Contact"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Notfound    = lazy(() => import("./pages/Notfound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container mt-5">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resumes />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/blog-details/:id/:title" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
