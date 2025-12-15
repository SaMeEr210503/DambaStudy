import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { pageVariants, itemVariants, containerVariants, buttonVariants } from "../utils/motionVariants";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const from = searchParams.get("from") || "/dashboard";

  async function onSubmit(data) {
    setLoading(true);
    const result = await login({ email: data.email, password: data.password });
    setLoading(false);
    if (result.ok) navigate(from);
  }

  return (
    <motion.div
      className="auth-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="auth-container"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Logo */}
        <motion.div className="auth-logo" variants={itemVariants}>
          <Link to="/">DambaStudy</Link>
        </motion.div>

        {/* Title */}
        <motion.h1 className="auth-title" variants={itemVariants}>
          Welcome Back
        </motion.h1>
        <motion.p className="auth-subtitle" variants={itemVariants}>
          Sign in to continue learning
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="auth-form"
          variants={itemVariants}
        >
          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="auth-error">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className={`auth-input ${errors.password ? "auth-input-error" : ""}`}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="auth-error">{errors.password.message}</span>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="auth-submit"
            disabled={loading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? (
              <span className="auth-loading">
                <svg className="auth-spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="32" strokeLinecap="round" />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p className="auth-footer" variants={itemVariants}>
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </motion.p>
      </motion.div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: linear-gradient(180deg, #0e0e0f 0%, #141416 100%);
        }

        .auth-container {
          width: 100%;
          max-width: 420px;
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
        }

        .auth-logo {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-logo a {
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }

        .auth-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          font-size: 0.95rem;
          color: #8a8a8a;
          text-align: center;
          margin: 0 0 2rem 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .auth-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #d1d1d1;
        }

        .auth-input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: #1a1a1d;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
          color: #f5f5f5;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .auth-input::placeholder {
          color: #6b6b6b;
        }

        .auth-input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15);
        }

        .auth-input-error {
          border-color: #ef4444;
        }

        .auth-error {
          font-size: 0.8rem;
          color: #f87171;
        }

        .auth-submit {
          width: 100%;
          padding: 1rem;
          margin-top: 0.5rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(147, 51, 234, 0.35);
          transition: all 0.2s ease;
        }

        .auth-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #a855f7, #8b5cf6);
          box-shadow: 0 12px 32px rgba(147, 51, 234, 0.45);
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .auth-spinner {
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #8a8a8a;
        }

        .auth-link {
          color: #a855f7;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .auth-link:hover {
          color: #c084fc;
        }
      `}</style>
    </motion.div>
  );
}
