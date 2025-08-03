import React, { use, useContext } from "react";
import { Button } from "./components/ui/button";
import { Route, Router, Routes } from "react-router-dom";
import AuthIndex from "./pages/auth";
import { AuthContext } from "./context/auth-context";
import RouteGuard from "./components/route-guard";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            authenticated={auth.authenticated}
            user={auth.user}
            element={<AuthIndex />}
          />
        }
      />
    </Routes>
  );
}

export default App;
