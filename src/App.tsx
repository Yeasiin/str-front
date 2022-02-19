import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<ReviewDetails />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </div>
  );
};

export default App;
