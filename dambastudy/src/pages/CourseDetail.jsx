import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Play,
    Clock,
    Users,
    Star,
    BookOpen,
    Award,
    ChevronDown,
    ChevronUp,
    ShoppingCart,
    Check
} from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { pageVariants, itemVariants } from "../utils/motionVariants";

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart, cartItems } = useCart();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [expandedLesson, setExpandedLesson] = useState(null);

    useEffect(() => {
        if (!id || id === "undefined") {
            setLoading(false);
            return;
        }

        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const res = await api.get(`/courses/${id}`);
                if (!mounted) return;
                setCourse(res.data);

                // Check if enrolled
                if (user) {
                    try {
                        const enrollRes = await api.get(`/enroll/check/${id}`);
                        setIsEnrolled(enrollRes.data.enrolled);
                    } catch { }
                }
            } catch (err) {
                console.error("course fetch error", err);
                toast.error(err?.response?.data?.message || "Failed to load course");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, [id, user]);

    async function handleEnroll() {
        if (!user) {
            navigate(`/login?from=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        setEnrolling(true);
        try {
            await api.post("/enroll", { courseId: id });
            toast.success("Enrolled successfully! 🎉");
            setIsEnrolled(true);
        } catch (err) {
            console.error("enroll error", err);
            toast.error(err?.response?.data?.message || "Enroll failed");
        } finally {
            setEnrolling(false);
        }
    }

    function handleAddToCart() {
        if (course) {
            addToCart(course);
            toast.success("Added to cart!");
        }
    }

    function handleStartLearning() {
        if (course?.lessons?.length > 0) {
            const firstLesson = course.lessons[0];
            navigate(`/learn/${id}/${firstLesson._id || firstLesson.id}`);
        }
    }

    const isInCart = cartItems.some(item => (item._id || item.id) === id);

    if (loading) {
        return (
            <div className="course-detail-loading">
                <div className="course-detail-spinner" />
                <p>Loading course...</p>
                <style>{`
                    .course-detail-loading {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #8a8a8a;
                    }
                    .course-detail-spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid #2a2a2d;
                        border-top-color: #a855f7;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="course-detail-error">
                <BookOpen size={48} strokeWidth={1.5} />
                <h2>Course not found</h2>
                <p>The course you're looking for doesn't exist.</p>
                <Link to="/courses" className="course-detail-back-btn">
                    Browse Courses
                </Link>
                <style>{`
                    .course-detail-error {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        color: #8a8a8a;
                        padding: 2rem;
                    }
                    .course-detail-error h2 {
                        color: #f5f5f5;
                        margin: 1rem 0 0.5rem;
                    }
                    .course-detail-back-btn {
                        margin-top: 1.5rem;
                        padding: 0.75rem 1.5rem;
                        background: #a855f7;
                        color: white;
                        border-radius: 0.5rem;
                        text-decoration: none;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <motion.div
            className="course-detail"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            {/* Hero Section */}
            <div className="course-detail-hero">
                <div className="course-detail-hero-content">
                    <motion.div variants={itemVariants}>
                        <span className="course-detail-category">
                            {course.category?.name || "Course"}
                        </span>
                        <h1 className="course-detail-title">{course.title}</h1>
                        <p className="course-detail-description">
                            {course.shortDescription || course.description}
                        </p>

                        <div className="course-detail-meta">
                            <span className="course-detail-meta-item">
                                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                {course.rating || "4.5"} Rating
                            </span>
                            <span className="course-detail-meta-item">
                                <Users size={16} />
                                {course.enrolledCount?.toLocaleString() || "0"} Students
                            </span>
                            <span className="course-detail-meta-item">
                                <Clock size={16} />
                                {course.duration || "8 hours"}
                            </span>
                            <span className="course-detail-meta-item">
                                <Award size={16} />
                                {course.level || "Beginner"}
                            </span>
                        </div>

                        <div className="course-detail-instructor">
                            <div className="course-detail-instructor-avatar">
                                {course.instructor?.name?.charAt(0) || "I"}
                            </div>
                            <div>
                                <p className="course-detail-instructor-label">Instructor</p>
                                <p className="course-detail-instructor-name">
                                    {course.instructor?.name || "DambaStudy Instructor"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div className="course-detail-card" variants={itemVariants}>
                    {course.thumbnail ? (
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="course-detail-card-img"
                        />
                    ) : (
                        <div className="course-detail-card-placeholder">
                            <Play size={48} />
                        </div>
                    )}

                    <div className="course-detail-card-body">
                        <div className="course-detail-price">
                            {course.price ? `₹${course.price.toLocaleString()}` : "Free"}
                        </div>

                        {isEnrolled ? (
                            <button
                                onClick={handleStartLearning}
                                className="course-detail-btn course-detail-btn-success"
                            >
                                <Play size={18} />
                                Start Learning
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="course-detail-btn course-detail-btn-primary"
                                >
                                    {enrolling ? "Processing..." : (
                                        <>
                                            <Check size={18} />
                                            Enroll Now
                                        </>
                                    )}
                                </button>

                                {!isInCart && (
                                    <button
                                        onClick={handleAddToCart}
                                        className="course-detail-btn course-detail-btn-secondary"
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                )}

                                {isInCart && (
                                    <Link to="/cart" className="course-detail-btn course-detail-btn-secondary">
                                        <ShoppingCart size={18} />
                                        View Cart
                                    </Link>
                                )}
                            </>
                        )}

                        <div className="course-detail-includes">
                            <p className="course-detail-includes-title">This course includes:</p>
                            <ul>
                                <li>📹 {course.lessons?.length || 8} video lessons</li>
                                <li>📱 Mobile & desktop access</li>
                                <li>🏆 Certificate of completion</li>
                                <li>♾️ Lifetime access</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="course-detail-content">
                {/* Lessons */}
                <section className="course-detail-section">
                    <h2 className="course-detail-section-title">
                        <BookOpen size={20} />
                        Course Content
                        <span className="course-detail-lesson-count">
                            {course.lessons?.length || 0} lessons
                        </span>
                    </h2>

                    <div className="course-detail-lessons">
                        {(course.lessons || []).map((lesson, index) => (
                            <div
                                key={lesson._id || lesson.id || index}
                                className="course-detail-lesson"
                            >
                                <button
                                    className="course-detail-lesson-header"
                                    onClick={() => setExpandedLesson(
                                        expandedLesson === index ? null : index
                                    )}
                                >
                                    <div className="course-detail-lesson-info">
                                        <span className="course-detail-lesson-num">{index + 1}</span>
                                        <span className="course-detail-lesson-title">{lesson.title}</span>
                                    </div>
                                    <div className="course-detail-lesson-meta">
                                        {lesson.duration && (
                                            <span className="course-detail-lesson-duration">
                                                {lesson.duration}
                                            </span>
                                        )}
                                        {expandedLesson === index ? (
                                            <ChevronUp size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )}
                                    </div>
                                </button>

                                {expandedLesson === index && (
                                    <div className="course-detail-lesson-content">
                                        <p>Preview this lesson after enrolling in the course.</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {(!course.lessons || course.lessons.length === 0) && (
                            <div className="course-detail-no-lessons">
                                <p>Lesson content will be available after enrollment.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Reviews */}
                {course.reviews?.length > 0 && (
                    <section className="course-detail-section">
                        <h2 className="course-detail-section-title">
                            <Star size={20} />
                            Student Reviews
                        </h2>

                        <div className="course-detail-reviews">
                            {course.reviews.map((review, index) => (
                                <div key={index} className="course-detail-review">
                                    <div className="course-detail-review-header">
                                        <div className="course-detail-review-avatar">
                                            {review.userName?.charAt(0) || "S"}
                                        </div>
                                        <div>
                                            <p className="course-detail-review-name">
                                                {review.userName}
                                            </p>
                                            <div className="course-detail-review-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        fill={i < review.rating ? "#fbbf24" : "transparent"}
                                                        color="#fbbf24"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="course-detail-review-comment">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <style>{`
                .course-detail {
                    min-height: calc(100vh - 4rem);
                }

                .course-detail-hero {
                    background: linear-gradient(180deg, #1a1a1d 0%, #141416 100%);
                    padding: 3rem 1.5rem;
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 3rem;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .course-detail-category {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: rgba(168, 85, 247, 0.15);
                    color: #a855f7;
                    font-size: 0.8rem;
                    font-weight: 500;
                    border-radius: 1rem;
                    margin-bottom: 1rem;
                }

                .course-detail-title {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #f5f5f5;
                    margin: 0 0 1rem 0;
                    line-height: 1.3;
                }

                .course-detail-description {
                    font-size: 1.05rem;
                    color: #a3a3a3;
                    line-height: 1.6;
                    margin: 0 0 1.5rem 0;
                }

                .course-detail-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .course-detail-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #d1d1d1;
                    font-size: 0.9rem;
                }

                .course-detail-instructor {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .course-detail-instructor-avatar {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #a855f7, #ec4899);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    color: white;
                }

                .course-detail-instructor-label {
                    font-size: 0.8rem;
                    color: #8a8a8a;
                    margin: 0;
                }

                .course-detail-instructor-name {
                    font-size: 0.95rem;
                    color: #f5f5f5;
                    font-weight: 500;
                    margin: 0;
                }

                .course-detail-card {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    overflow: hidden;
                    position: sticky;
                    top: 5rem;
                }

                .course-detail-card-img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .course-detail-card-placeholder {
                    width: 100%;
                    height: 200px;
                    background: #1a1a1d;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #3a3a3d;
                }

                .course-detail-card-body {
                    padding: 1.5rem;
                }

                .course-detail-price {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f5f5f5;
                    margin-bottom: 1rem;
                }

                .course-detail-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.875rem;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-bottom: 0.75rem;
                    text-decoration: none;
                }

                .course-detail-btn-primary {
                    background: linear-gradient(135deg, #9333ea, #7c3aed);
                    color: white;
                    border: none;
                    box-shadow: 0 8px 24px rgba(147, 51, 234, 0.35);
                }

                .course-detail-btn-primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(147, 51, 234, 0.45);
                }

                .course-detail-btn-primary:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .course-detail-btn-success {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: white;
                    border: none;
                    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.35);
                }

                .course-detail-btn-secondary {
                    background: transparent;
                    color: #d1d1d1;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    box-shadow: none;
                }

                .course-detail-btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.25);
                    transform: none;
                }

                .course-detail-includes {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .course-detail-includes-title {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #d1d1d1;
                    margin: 0 0 0.75rem 0;
                }

                .course-detail-includes ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .course-detail-includes li {
                    font-size: 0.85rem;
                    color: #8a8a8a;
                    padding: 0.35rem 0;
                }

                .course-detail-content {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 2rem 1.5rem;
                }

                .course-detail-section {
                    margin-bottom: 2rem;
                }

                .course-detail-section-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    margin: 0 0 1rem 0;
                }

                .course-detail-lesson-count {
                    margin-left: auto;
                    font-size: 0.85rem;
                    font-weight: 400;
                    color: #8a8a8a;
                }

                .course-detail-lessons {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    overflow: hidden;
                }

                .course-detail-lesson {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .course-detail-lesson:last-child {
                    border-bottom: none;
                }

                .course-detail-lesson-header {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.25rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #d1d1d1;
                    text-align: left;
                    box-shadow: none;
                }

                .course-detail-lesson-header:hover {
                    background: rgba(255, 255, 255, 0.02);
                    transform: none;
                }

                .course-detail-lesson-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .course-detail-lesson-num {
                    width: 28px;
                    height: 28px;
                    background: #2a2a2d;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    color: #8a8a8a;
                }

                .course-detail-lesson-title {
                    font-size: 0.95rem;
                }

                .course-detail-lesson-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #6b6b6b;
                }

                .course-detail-lesson-duration {
                    font-size: 0.8rem;
                }

                .course-detail-lesson-content {
                    padding: 0 1.25rem 1rem 3.5rem;
                    font-size: 0.9rem;
                    color: #8a8a8a;
                }

                .course-detail-no-lessons {
                    padding: 2rem;
                    text-align: center;
                    color: #6b6b6b;
                }

                .course-detail-reviews {
                    display: grid;
                    gap: 1rem;
                }

                .course-detail-review {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 0.75rem;
                    padding: 1.25rem;
                }

                .course-detail-review-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 0.75rem;
                }

                .course-detail-review-avatar {
                    width: 36px;
                    height: 36px;
                    background: #2a2a2d;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                    color: #d1d1d1;
                }

                .course-detail-review-name {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #f5f5f5;
                    margin: 0;
                }

                .course-detail-review-rating {
                    display: flex;
                    gap: 2px;
                }

                .course-detail-review-comment {
                    font-size: 0.9rem;
                    color: #a3a3a3;
                    line-height: 1.5;
                    margin: 0;
                }

                @media (max-width: 900px) {
                    .course-detail-hero {
                        grid-template-columns: 1fr;
                        padding: 2rem 1rem;
                    }

                    .course-detail-card {
                        position: static;
                    }

                    .course-detail-title {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </motion.div>
    );
}
