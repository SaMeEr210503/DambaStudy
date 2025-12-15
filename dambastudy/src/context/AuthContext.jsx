import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("damba_token");
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (token) {
      try { localStorage.setItem("damba_token", token); } catch { }
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      try { localStorage.removeItem("damba_token"); } catch { }
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    let mounted = true;
    async function fetchMe() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await api.get("/auth/me");
        if (!mounted) return;
        setUser(res.data.user ?? res.data);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchMe();
    return () => { mounted = false; };
  }, [token]);

  async function login({ email, password }) {
    setAuthenticating(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data || {};
      const newToken = data.token ?? data.accessToken;
      const userData = data.user ?? data;
      if (!newToken) throw new Error("No token returned");
      setToken(newToken);
      setUser(userData);
      toast.success("Logged in");
      return { ok: true, user: userData };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      return { ok: false };
    } finally {
      setAuthenticating(false);
    }
  }

  async function register({ name, email, password }) {
    setAuthenticating(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      const data = res.data || {};
      const newToken = data.token ?? data.accessToken;
      const userData = data.user ?? data;
      if (!newToken) throw new Error("No token returned");
      setToken(newToken);
      setUser(userData);
      toast.success("Registered");
      return { ok: true, user: userData };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Register failed");
      return { ok: false };
    } finally {
      setAuthenticating(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    try { localStorage.removeItem("damba_token"); } catch { }
    toast.success("Logged out");
  }

  return (
    <AuthContext.Provider value={{
      user, token, loading, authenticating,
      login, register, logout, setUser, setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
