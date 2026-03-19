import React from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./scss/bootstrap-custom.scss";
import "./index.css";
import App from "./App";
import './data';
const root = createRoot(document.getElementById("root"));
root.render(<App />);
