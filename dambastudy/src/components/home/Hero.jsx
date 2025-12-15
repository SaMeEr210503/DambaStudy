import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { heroVariants, containerVariants, itemVariants, buttonVariants } from "../../utils/motionVariants";

export default function Hero() {
  return (
    <motion.section
      className="hero"
      variants={heroVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="hero-badge-dot"></span>
          Learn with the best instructors
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero-title" variants={itemVariants}>
          Master New Skills,
          <br />
          <span className="hero-title-gradient">Shape Your Future</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Join thousands of learners worldwide. Access premium courses, earn certificates,
          and accelerate your career with industry-leading education.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="hero-actions" variants={itemVariants}>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link to="/courses" className="hero-btn-primary">
              Explore Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link to="/register" className="hero-btn-secondary">
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div className="hero-stats" variants={itemVariants}>
          <div className="hero-stat">
            <span className="hero-stat-value">10K+</span>
            <span className="hero-stat-label">Students</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-value">500+</span>
            <span className="hero-stat-label">Courses</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-value">50+</span>
            <span className="hero-stat-label">Instructors</span>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .hero {
          background: linear-gradient(180deg, #1a1a1c 0%, #0e0e0f 100%);
          padding: 5rem 1.5rem;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(168, 85, 247, 0.08) 0%,
            transparent 50%
          );
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .hero-content {
          max-width: 800px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 2rem;
          font-size: 0.85rem;
          color: #c4b5fd;
          margin-bottom: 2rem;
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          background: #a855f7;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.02em;
        }

        .hero-title-gradient {
          background: linear-gradient(135deg, #a855f7, #ec4899, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #8a8a8a;
          margin: 0 auto 2.5rem auto;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 0.75rem;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(147, 51, 234, 0.4);
          transition: all 0.3s ease;
        }

        .hero-btn-primary:hover {
          box-shadow: 0 12px 32px rgba(147, 51, 234, 0.5);
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: transparent;
          color: #d1d1d1;
          font-size: 1rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.75rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .hero-stat {
          text-align: center;
        }

        .hero-stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        .hero-stat-label {
          display: block;
          font-size: 0.85rem;
          color: #6b6b6b;
          margin-top: 0.25rem;
        }

        .hero-stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3rem 1rem;
            min-height: 70vh;
          }

          .hero-title {
            font-size: 2.25rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-stats {
            gap: 1rem;
          }

          .hero-stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </motion.section>
  );
}
