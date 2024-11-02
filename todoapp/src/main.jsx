import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Sidebar from "./Reuseable/Sidebar";  // Adjust path if necessary
import Home from "./pages/Home";
import dashboardRoutes from "./routes";
import Login from "./pages/Login";
 // Assuming you have a Signup component
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      {/* Auth routes without Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* Admin layout with Sidebar */}
      <Route
        path="/admin/*"
        element={
          <div className="flex h-screen">
            {/* Sidebar: fixed position */}
            {/* <Sidebar className="w-60 fixed top-0 left-0 h-full bg-gray-800 text-white" /> */}

            {/* Main content area */}
            <div className="p-4 w-full">
              <Routes>
                {/* Render /admin routes with the sidebar always visible */}
                <Route path="dashboard" element={<Home />} />
                {dashboardRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  </Router>
);