import React from "react";
import Header from "./Header";
import BackgroundLines from "./BackgroundLines";

 function Layout(props){
  return (
    <div className="mi-wrapper">
      <a className="mi-skip-to-content" href="#main-content">
        Skip to content
      </a>
      <BackgroundLines />
      <Header />
      <main id="main-content">
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
