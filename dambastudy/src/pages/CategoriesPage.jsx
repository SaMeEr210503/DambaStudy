import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Code,
    Palette,
    TrendingUp,
    Database,
    Shield,
    Smartphone,
    Brain,
    Globe,
    Briefcase,
    Camera
} from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { pageVariants, containerVariants, itemVariants } from "../utils/motionVariants";

const categoryIcons = {
    "Programming": Code,
    "Web Development": Globe,
    "Data Science": Database,
    "Machine Learning": Brain,
    "Cybersecurity": Shield,
    "Graphic Design": Palette,
    "Business & Finance": Briefcase,
    "Marketing": TrendingUp,
    "Mobile Development": Smartphone,
    "UI/UX Design": Camera,
};

const categoryColors = [
    "#a855f7", "#ec4899", "#f59e0b", "#22c55e",
    "#3b82f6", "#ef4444", "#8b5cf6", "#14b8a6",
    "#f97316", "#6366f1"
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await api.get("/categories");
                setCategories(res.data || []);
            } catch (err) {
                console.error("Failed to load categories", err);
                toast.error("Failed to load categories");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <motion.div
            className="categories-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            {/* Header */}
            <div className="categories-header">
                <motion.h1 className="categories-title" variants={itemVariants}>
                    Browse <span className="gradient-text">Categories</span>
                </motion.h1>
                <motion.p className="categories-subtitle" variants={itemVariants}>
                    Explore our diverse range of course categories and find your perfect learning path
                </motion.p>
            </div>

            {/* Categories Grid */}
            <motion.div
                className="categories-grid"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                {loading ? (
                    // Skeleton
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="category-skeleton" />
                    ))
                ) : categories.length === 0 ? (
                    <div className="categories-empty">
                        <p>No categories found</p>
                    </div>
                ) : (
                    categories.map((category, index) => {
                        const IconComponent = categoryIcons[category.name] || Code;
                        const color = categoryColors[index % categoryColors.length];

                        return (
                            <motion.div
                                key={category._id || category.id || index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    to={`/courses?category=${encodeURIComponent(category.name)}`}
                                    className="category-card"
                                    style={{ '--accent-color': color }}
                                >
                                    <div
                                        className="category-icon"
                                        style={{ backgroundColor: `${color}15`, color: color }}
                                    >
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="category-name">{category.name}</h3>
                                    <p className="category-count">
                                        {category.courseCount || "10+"} Courses
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })
                )}
            </motion.div>

            <style>{`
        .categories-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        .categories-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .categories-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 1rem 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .categories-subtitle {
          font-size: 1.1rem;
          color: #8a8a8a;
          margin: 0;
          max-width: 600px;
          margin: 0 auto;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          display: block;
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 2rem;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
        }

        .category-card:hover {
          border-color: var(--accent-color, #a855f7);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .category-icon {
          width: 64px;
          height: 64px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .category-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 0.5rem 0;
        }

        .category-count {
          font-size: 0.9rem;
          color: #8a8a8a;
          margin: 0;
        }

        .category-skeleton {
          height: 180px;
          background: linear-gradient(90deg, #141416 0%, #1a1a1d 50%, #141416 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite ease-in-out;
          border-radius: 1rem;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .categories-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: #8a8a8a;
        }

        @media (max-width: 768px) {
          .categories-title {
            font-size: 1.75rem;
          }

          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .category-card {
            padding: 1.5rem;
          }

          .category-icon {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
        </motion.div>
    );
}
