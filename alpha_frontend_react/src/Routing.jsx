import React from "react";
import { Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import Home from "./pages/Home";

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/clients" element={<Clients />} />
      </Routes>
    </div>
  );
}
