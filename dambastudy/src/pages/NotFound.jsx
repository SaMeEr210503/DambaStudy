import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { pageVariants, itemVariants } from "../utils/motionVariants";

export default function NotFound() {
    return (
        <motion.div
            className="not-found"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <div className="not-found-content">
                <motion.div className="not-found-code" variants={itemVariants}>
                    404
                </motion.div>

                <motion.h1 className="not-found-title" variants={itemVariants}>
                    Page Not Found
                </motion.h1>

                <motion.p className="not-found-description" variants={itemVariants}>
                    Oops! The page you're looking for doesn't exist or has been moved.
                </motion.p>

                <motion.div className="not-found-actions" variants={itemVariants}>
                    <Link to="/" className="not-found-btn-primary">
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="not-found-btn-secondary"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </motion.div>
            </div>

            <style>{`
        .not-found {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(180deg, #0e0e0f 0%, #141416 100%);
        }

        .not-found-content {
          text-align: center;
          max-width: 500px;
        }

        .not-found-code {
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
        }

        .not-found-title {
          font-size: 2rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 1rem 0;
        }

        .not-found-description {
          font-size: 1.1rem;
          color: #8a8a8a;
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }

        .not-found-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .not-found-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 0.75rem;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(147, 51, 234, 0.35);
          transition: all 0.3s ease;
        }

        .not-found-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(147, 51, 234, 0.45);
        }

        .not-found-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: transparent;
          color: #d1d1d1;
          font-size: 0.95rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: none;
        }

        .not-found-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          transform: none;
        }

        @media (max-width: 480px) {
          .not-found-code {
            font-size: 5rem;
          }

          .not-found-title {
            font-size: 1.5rem;
          }

          .not-found-actions {
            flex-direction: column;
          }
        }
      `}</style>
        </motion.div>
    );
}
