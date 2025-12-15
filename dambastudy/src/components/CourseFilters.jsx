import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Search } from "lucide-react";
import api from "../utils/api";

/**
 * CourseFilters - Dark Theme
 * Props:
 *  - onChange: function(filters) called when user changes filters
 *  - initial: optional initial filter object
 */
export default function CourseFilters({ onChange, initial = {} }) {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState(initial.search || "");
    const [category, setCategory] = useState(initial.category || "");
    const [level, setLevel] = useState(initial.level || "");
    const [sort, setSort] = useState(initial.sort || "");
    const [showFilters, setShowFilters] = useState(true);

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await api.get("/categories");
                setCategories(res.data || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        }
        fetchCategories();
    }, []);

    // Trigger onChange when filters change
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange?.({ search, category, level, sort });
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, category, level, sort]);

    function handleReset() {
        setSearch("");
        setCategory("");
        setLevel("");
        setSort("");
    }

    const hasFilters = search || category || level || sort;

    return (
        <div className="course-filters">
            <div className="course-filters-header">
                <h3 className="course-filters-title">
                    <SlidersHorizontal size={18} />
                    Filters
                </h3>
                {hasFilters && (
                    <button onClick={handleReset} className="course-filters-reset">
                        <X size={14} />
                        Reset
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="course-filters-section">
                <label className="course-filters-label">Search</label>
                <div className="course-filters-search">
                    <Search size={16} className="course-filters-search-icon" />
                    <input
                        type="search"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="course-filters-input"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="course-filters-section">
                <label className="course-filters-label">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="course-filters-select"
                >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                        <option key={c._id || c.id} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Level */}
            <div className="course-filters-section">
                <label className="course-filters-label">Level</label>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="course-filters-select"
                >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            {/* Sort */}
            <div className="course-filters-section">
                <label className="course-filters-label">Sort By</label>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="course-filters-select"
                >
                    <option value="">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            <style>{`
                .course-filters {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    padding: 1.25rem;
                    position: sticky;
                    top: 5rem;
                }

                .course-filters-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.25rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .course-filters-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    margin: 0;
                }

                .course-filters-reset {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.25rem 0.5rem;
                    background: transparent;
                    border: none;
                    color: #ef4444;
                    font-size: 0.8rem;
                    cursor: pointer;
                    box-shadow: none;
                }

                .course-filters-reset:hover {
                    color: #f87171;
                    transform: none;
                }

                .course-filters-section {
                    margin-bottom: 1rem;
                }

                .course-filters-label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: #8a8a8a;
                    margin-bottom: 0.5rem;
                }

                .course-filters-search {
                    position: relative;
                }

                .course-filters-search-icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #6b6b6b;
                }

                .course-filters-input {
                    width: 100%;
                    padding: 0.625rem 0.75rem 0.625rem 2.25rem;
                    background: #1a1a1d;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.5rem;
                    color: #f5f5f5;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .course-filters-input:focus {
                    border-color: #a855f7;
                }

                .course-filters-input::placeholder {
                    color: #6b6b6b;
                }

                .course-filters-select {
                    width: 100%;
                    padding: 0.625rem 0.75rem;
                    background: #1a1a1d;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.5rem;
                    color: #f5f5f5;
                    font-size: 0.9rem;
                    outline: none;
                    cursor: pointer;
                    transition: border-color 0.2s;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                }

                .course-filters-select:focus {
                    border-color: #a855f7;
                }

                .course-filters-select option {
                    background: #1a1a1d;
                    color: #f5f5f5;
                }
            `}</style>
        </div>
    );
}
