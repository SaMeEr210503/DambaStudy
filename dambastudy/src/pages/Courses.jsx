import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import CourseCard from "../components/CourseCard";
import CourseFilters from "../components/CourseFilters";
import EmptyState from "../components/EmptyState";
import useCourses from "../hooks/useCourses";
import { pageVariants, containerVariants, itemVariants } from "../utils/motionVariants";

export default function Courses() {
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category") || "";

    const [filterObj, setFilterObj] = useState({
        search: initialSearch,
        category: initialCategory,
    });

    const { data: courses, loading, error, total, page, setPage, limit, refetch } = useCourses({
        page: 1,
        limit: 12
    });

    // Refetch when filterObj changes
    useEffect(() => {
        refetch(filterObj);
    }, [filterObj]);

    const totalPages = Math.ceil(total / limit);

    return (
        <motion.div
            className="courses-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <div className="courses-header">
                <h1 className="courses-title">
                    <BookOpen size={28} />
                    Explore Courses
                </h1>
                <p className="courses-subtitle">
                    Discover {total || 0} courses to advance your skills
                </p>
            </div>

            <div className="courses-grid">
                <aside className="courses-sidebar">
                    <CourseFilters
                        initial={filterObj}
                        onChange={(filters) => setFilterObj(filters)}
                    />
                </aside>

                <main className="courses-main">
                    {loading ? (
                        <div className="courses-skeleton-grid">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="courses-skeleton-card">
                                    <div className="courses-skeleton-img" />
                                    <div className="courses-skeleton-content">
                                        <div className="courses-skeleton-title" />
                                        <div className="courses-skeleton-text" />
                                        <div className="courses-skeleton-text short" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <EmptyState
                            icon="alert"
                            title="Failed to load courses"
                            description="Something went wrong. Please try again later."
                            actionLabel="Retry"
                            onAction={() => refetch(filterObj)}
                        />
                    ) : courses.length === 0 ? (
                        <EmptyState
                            icon="search"
                            title="No courses found"
                            description="Try adjusting your filters or search term"
                            actionLabel="Clear Filters"
                            onAction={() => setFilterObj({})}
                        />
                    ) : (
                        <>
                            <motion.div
                                className="courses-list"
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                            >
                                {courses.map(c => (
                                    <motion.div key={c._id ?? c.id} variants={itemVariants}>
                                        <CourseCard course={c} />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="courses-pagination">
                                    <span className="courses-pagination-info">
                                        Page {page} of {totalPages}
                                    </span>
                                    <div className="courses-pagination-btns">
                                        <button
                                            onClick={() => setPage(Math.max(1, page - 1))}
                                            disabled={page === 1}
                                            className="courses-pagination-btn"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                                            disabled={page >= totalPages}
                                            className="courses-pagination-btn"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            <style>{`
                .courses-page {
                    min-height: calc(100vh - 4rem);
                    padding: 2rem 1.5rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .courses-header {
                    margin-bottom: 2rem;
                }

                .courses-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f5f5f5;
                    margin: 0 0 0.5rem 0;
                }

                .courses-subtitle {
                    color: #8a8a8a;
                    font-size: 1rem;
                    margin: 0;
                }

                .courses-grid {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 2rem;
                }

                .courses-sidebar {
                    flex-shrink: 0;
                }

                .courses-main {
                    min-width: 0;
                }

                .courses-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .courses-skeleton-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .courses-skeleton-card {
                    background: #141416;
                    border-radius: 1rem;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                }

                .courses-skeleton-img {
                    height: 160px;
                    background: linear-gradient(90deg, #1a1a1d 25%, #222225 50%, #1a1a1d 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }

                .courses-skeleton-content {
                    padding: 1.25rem;
                }

                .courses-skeleton-title {
                    height: 20px;
                    background: linear-gradient(90deg, #1a1a1d 25%, #222225 50%, #1a1a1d 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 4px;
                    margin-bottom: 0.75rem;
                }

                .courses-skeleton-text {
                    height: 14px;
                    background: linear-gradient(90deg, #1a1a1d 25%, #222225 50%, #1a1a1d 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                }

                .courses-skeleton-text.short {
                    width: 60%;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .courses-pagination {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .courses-pagination-info {
                    color: #8a8a8a;
                    font-size: 0.9rem;
                }

                .courses-pagination-btns {
                    display: flex;
                    gap: 0.75rem;
                }

                .courses-pagination-btn {
                    padding: 0.5rem 1rem;
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    color: #d1d1d1;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: none;
                }

                .courses-pagination-btn:hover:not(:disabled) {
                    border-color: rgba(255, 255, 255, 0.2);
                    color: #f5f5f5;
                    transform: none;
                }

                .courses-pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @media (max-width: 900px) {
                    .courses-grid {
                        grid-template-columns: 1fr;
                    }

                    .courses-sidebar {
                        order: -1;
                    }
                }
            `}</style>
        </motion.div>
    );
}
