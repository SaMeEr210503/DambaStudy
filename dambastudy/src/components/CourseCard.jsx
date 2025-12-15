import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Check, Star } from "lucide-react";
import { cardVariants } from "../utils/motionVariants";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

/**
 * CourseCard - Premium Dark Mode Design with Framer Motion
 * Props:
 *  - course: { _id, id, title, thumbnail, price, level, instructor, rating, enrolledCount, description }
 */
export default function CourseCard({ course }) {
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  if (!course) return null;

  const courseId = course._id || course.id;
  const inCart = isInCart(courseId);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) {
      navigate("/cart");
    } else {
      const success = addToCart(course);
      if (success) {
        toast.success("Added to cart!");
      }
    }
  }

  function handleViewCourse(e) {
    e.preventDefault();
    navigate(`/courses/${courseId}`);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="course-card-wrapper"
    >
      <div className="course-card">
        {/* Thumbnail */}
        <Link to={`/courses/${courseId}`} className="course-card-thumbnail">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="course-card-image"
            />
          ) : (
            <div className="course-card-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}

          {/* Level Badge */}
          {course.level && (
            <span className="course-card-badge">{course.level}</span>
          )}
        </Link>

        {/* Content */}
        <div className="course-card-content">
          {/* Title */}
          <Link to={`/courses/${courseId}`} className="course-card-title-link">
            <h3 className="course-card-title">{course.title}</h3>
          </Link>

          {/* Description */}
          {course.description && (
            <p className="course-card-description">
              {course.description}
            </p>
          )}

          {/* Instructor */}
          <p className="course-card-instructor">
            {course.instructor?.name ?? course.instructor ?? "DambaStudy Instructor"}
          </p>

          {/* Rating & Enrolled */}
          <div className="course-card-stats">
            <span className="course-card-rating">
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              {course.rating ?? "4.5"}
            </span>
            {course.enrolledCount && (
              <span className="course-card-enrolled">
                {course.enrolledCount.toLocaleString()} students
              </span>
            )}
          </div>

          {/* Footer: Price & Buttons */}
          <div className="course-card-footer">
            <span className="course-card-price">
              {course.price ? `₹${course.price.toLocaleString()}` : "Free"}
            </span>

            <div className="course-card-actions">
              <button
                onClick={handleAddToCart}
                className={`course-card-cart-btn ${inCart ? 'in-cart' : ''}`}
              >
                {inCart ? (
                  <>
                    <Check size={16} />
                    In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleViewCourse}
                className="course-card-cta"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .course-card-wrapper {
          height: 100%;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #141416;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .course-card:hover {
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
          border-color: rgba(168, 85, 247, 0.2);
        }

        .course-card-thumbnail {
          position: relative;
          height: 160px;
          background: #1a1a1d;
          overflow: hidden;
          display: block;
        }

        .course-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .course-card:hover .course-card-image {
          transform: scale(1.05);
        }

        .course-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a3a3d;
        }

        .course-card-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 0.25rem 0.75rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #d1d1d1;
        }

        .course-card-content {
          flex: 1;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }

        .course-card-title-link {
          text-decoration: none;
        }

        .course-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }

        .course-card-title:hover {
          color: #a855f7;
        }

        .course-card-description {
          font-size: 0.85rem;
          color: #8a8a8a;
          margin: 0 0 0.75rem 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-card-instructor {
          font-size: 0.85rem;
          color: #6b6b6b;
          margin: 0 0 0.75rem 0;
        }

        .course-card-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .course-card-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #fbbf24;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .course-card-enrolled {
          font-size: 0.8rem;
          color: #6b6b6b;
        }

        .course-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: auto;
        }

        .course-card-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #a855f7;
        }

        .course-card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .course-card-cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: none;
        }

        .course-card-cart-btn:hover {
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.4);
          transform: none;
        }

        .course-card-cart-btn.in-cart {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .course-card-cart-btn.in-cart:hover {
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        }

        .course-card-cta {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          border-radius: 0.5rem;
          border: none;
          font-size: 0.85rem;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: none;
        }

        .course-card-cta:hover {
          background: linear-gradient(135deg, #a855f7, #8b5cf6);
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.4);
          transform: none;
        }
      `}</style>
    </motion.div>
  );
}
