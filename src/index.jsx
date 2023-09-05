import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Footer from "./footer/footer.jsx";
import Header from "./header/header.jsx";
import MainNavigate from "./app/navigate.jsx";
import MainLite from "./app/reactLite.jsx";
import MainDark from "./app/reactDark.jsx";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainNavigate />} />
        <Route path="/lite" element={<MainLite />} />
        <Route path="/dark" element={<MainDark />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export async function getServerSideProps() {}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
