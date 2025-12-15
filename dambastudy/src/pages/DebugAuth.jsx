import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DebugAuth() {
  const { login, logout, user, token, authenticating } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl mb-3">Debug Auth</h1>
      <pre className="bg-gray-100 p-3 rounded mb-4">
        {JSON.stringify({ user, token, authenticating }, null, 2)}
      </pre>

      <button
        className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
        onClick={() => login({ email: "test@example.com", password: "password" })}
      >
        Login (demo)
      </button>

      <button
        className="px-3 py-1 bg-gray-700 text-white rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
