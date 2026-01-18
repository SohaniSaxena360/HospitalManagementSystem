// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // ← use default import

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = token ? jwt_decode(token).role : null; // ← default function

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
