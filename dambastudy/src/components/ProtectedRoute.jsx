import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Checking authentication...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={`/login?from=${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }

    if (adminOnly && !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}
