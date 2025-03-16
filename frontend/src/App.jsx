import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { DataProvider } from "./components/Data";

function App() {
  const [isAdmin, updateIsAdmin] = useState(0);
  return (
    <DataProvider>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={isAdmin ? "/admin" : "/home"} />}
            />
            <Route
              path="/home"
              element={
                !isAdmin ? (
                  <Home updateIsAdmin={updateIsAdmin} />
                ) : (
                  <Navigate to="/admin" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <Admin updateIsAdmin={updateIsAdmin} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
