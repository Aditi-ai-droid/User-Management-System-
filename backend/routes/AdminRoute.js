import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  // simple check (demo)
  const isAdmin = true;

  return isAdmin ? children : <Navigate to="/dashboard" />;
}

export default AdminRoute;