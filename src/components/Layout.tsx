import React from "react";
import Header from "./Header";
import BackgroundLines from "./BackgroundLines";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className="mi-wrapper">
      <a className="mi-skip-to-content" href="#main-content">
        Skip to content
      </a>
      <BackgroundLines />
      <Header />
      <main id="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
