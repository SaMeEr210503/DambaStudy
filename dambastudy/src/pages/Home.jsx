import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import PopularCourses from "../components/home/PopularCourses";
import api from "../utils/api";
import toast from "react-hot-toast";
import { pageVariants, containerVariants, itemVariants } from "../utils/motionVariants";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const catRes = await api.get("/categories");
                setCategories(catRes.data || []);

                const popRes = await api.get("/courses/popular");
                setPopular(popRes.data || []);
            } catch {
                toast.error("Failed to load homepage");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Hero />

            <div className="home-content">
                {/* Popular Courses Section */}
                <motion.section
                    className="home-section"
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h2 className="home-section-title" variants={itemVariants}>
                        Popular Courses
                    </motion.h2>
                    <motion.p className="home-section-subtitle" variants={itemVariants}>
                        Discover our most loved courses by students worldwide
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        {loading ? (
                            <div className="home-skeleton-grid">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="home-skeleton-card" />
                                ))}
                            </div>
                        ) : (
                            <PopularCourses courses={popular} />
                        )}
                    </motion.div>
                </motion.section>

                {/* Categories Section */}
                <motion.section
                    className="home-section"
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h2 className="home-section-title" variants={itemVariants}>
                        Browse Categories
                    </motion.h2>
                    <motion.p className="home-section-subtitle" variants={itemVariants}>
                        Explore courses by category and find your perfect match
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        {loading ? (
                            <div className="home-skeleton-grid home-skeleton-grid-cats">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="home-skeleton-cat" />
                                ))}
                            </div>
                        ) : (
                            <Categories items={categories} />
                        )}
                    </motion.div>
                </motion.section>
            </div>

            <style>{`
        .home-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }

        .home-section {
          margin-bottom: 5rem;
        }

        .home-section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 0.5rem 0;
          text-align: center;
        }

        .home-section-subtitle {
          font-size: 1rem;
          color: #8a8a8a;
          margin: 0 0 2.5rem 0;
          text-align: center;
        }

        .home-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .home-skeleton-grid-cats {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .home-skeleton-card {
          height: 320px;
          background: linear-gradient(
            90deg,
            #141416 0%,
            #1a1a1d 50%,
            #141416 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite ease-in-out;
          border-radius: 1rem;
        }

        .home-skeleton-cat {
          height: 80px;
          background: linear-gradient(
            90deg,
            #141416 0%,
            #1a1a1d 50%,
            #141416 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite ease-in-out;
          border-radius: 0.75rem;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </motion.div>
    );
}
