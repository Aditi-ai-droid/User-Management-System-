import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/Profile";
import Users from "./pages/User";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔥 FIRST PAGE */}
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;