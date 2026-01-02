import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../context/AuthContext/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (user) {
    return children;
  }

  // Pass the attempted path as `from` in state
  return <Navigate to="/login" state={location.pathname} />;
}
