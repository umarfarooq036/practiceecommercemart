import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./hook/protectedRoute";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProductPage />
           </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
