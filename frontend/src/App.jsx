import React from "react";
import { Button } from "./components/ui/button";
import { Route, Router, Routes } from "react-router-dom";
import AuthIndex from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthIndex />} />
    </Routes>
  );
}

export default App;
