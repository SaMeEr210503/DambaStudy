import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, BookOpen, Save } from "lucide-react";
import api from "../utils/api";
import VideoPlayer from "../components/VideoPlayer";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { pageVariants, itemVariants } from "../utils/motionVariants";

export default function VideoLearn() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);
    const [marking, setMarking] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load lesson data
    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const res = await api.get(`/courses/${courseId}/lessons/${lessonId}`);
                if (!mounted) return;

                const data = res.data;
                setCourse(data.course);
                setLesson(data.lesson);
                setLessons(data.lessons || []);

                // Load progress
                const progressRes = await api.get(`/progress/${courseId}`);
                setCompletedLessons(progressRes.data.completedLessons || []);

                // Load saved notes from localStorage
                const saved = localStorage.getItem(`notes_${courseId}_${lessonId}`);
                if (saved) setNotes(saved);

            } catch (err) {
                console.error("fetch error", err);
                if (err?.response?.status === 403) {
                    toast.error("You need to enroll in this course first");
                    navigate(`/courses/${courseId}`);
                } else {
                    toast.error("Failed to load lesson");
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false };
    }, [courseId, lessonId, navigate]);

    // Save notes to localStorage
    async function handleSaveNotes() {
        setSavingNotes(true);
        try {
            localStorage.setItem(`notes_${courseId}_${lessonId}`, notes);
            toast.success("Notes saved");
        } catch {
            toast.error("Error saving notes");
        } finally {
            setSavingNotes(false);
        }
    }

    // Mark lesson complete
    async function handleMarkComplete() {
        if (!user) {
            navigate(`/login?from=${encodeURIComponent(window.location.pathname)}`);
            return;
        }
        setMarking(true);
        try {
            await api.post("/progress/complete", { courseId, lessonId });
            setCompletedLessons(prev => [...prev, lessonId]);
            toast.success("Marked as completed ✓");
        } catch (err) {
            toast.error("Error marking lesson");
        } finally {
            setMarking(false);
        }
    }

    const isCompleted = completedLessons.includes(lessonId);
    const currentIndex = lessons.findIndex(l => (l._id || l.id) === lessonId);
    const prevLesson = lessons[currentIndex - 1];
    const nextLesson = lessons[currentIndex + 1];

    if (loading) {
        return (
            <div className="video-learn-loading">
                <div className="video-learn-loading-spinner" />
                <p>Loading lesson...</p>
                <style>{`
                    .video-learn-loading {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #8a8a8a;
                    }
                    .video-learn-loading-spinner {
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

    if (!course || !lesson) {
        return (
            <div className="video-learn-error">
                <BookOpen size={48} strokeWidth={1.5} />
                <h2>Lesson not found</h2>
                <p>The lesson you're looking for doesn't exist or you don't have access.</p>
                <Link to={`/courses/${courseId}`} className="video-learn-back-btn">
                    Back to Course
                </Link>
                <style>{`
                    .video-learn-error {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        color: #8a8a8a;
                        padding: 2rem;
                    }
                    .video-learn-error h2 {
                        color: #f5f5f5;
                        margin: 1rem 0 0.5rem;
                    }
                    .video-learn-back-btn {
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
            className="video-learn"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <div className="video-learn-grid">
                {/* Sidebar - Lesson List */}
                <aside className="video-learn-sidebar">
                    <div className="video-learn-sidebar-header">
                        <Link to={`/courses/${courseId}`} className="video-learn-course-link">
                            <ChevronLeft size={16} />
                            {course.title}
                        </Link>
                    </div>

                    <div className="video-learn-lessons">
                        {lessons.map((l, index) => {
                            const lId = l._id || l.id;
                            const isActive = lId === lessonId;
                            const isDone = completedLessons.includes(lId);

                            return (
                                <Link
                                    key={lId}
                                    to={`/learn/${courseId}/${lId}`}
                                    className={`video-learn-lesson-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                                >
                                    <span className="video-learn-lesson-num">
                                        {isDone ? <Check size={14} /> : index + 1}
                                    </span>
                                    <span className="video-learn-lesson-title">{l.title}</span>
                                    {l.duration && (
                                        <span className="video-learn-lesson-duration">{l.duration}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="video-learn-progress">
                        <div className="video-learn-progress-text">
                            Progress: {completedLessons.length}/{lessons.length}
                        </div>
                        <div className="video-learn-progress-bar">
                            <div
                                className="video-learn-progress-fill"
                                style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="video-learn-main">
                    <VideoPlayer src={lesson.videoUrl || ""} />

                    <motion.div className="video-learn-content" variants={itemVariants}>
                        <h1 className="video-learn-title">{lesson.title}</h1>

                        <div className="video-learn-actions">
                            {prevLesson && (
                                <button
                                    onClick={() => navigate(`/learn/${courseId}/${prevLesson._id || prevLesson.id}`)}
                                    className="video-learn-nav-btn"
                                >
                                    <ChevronLeft size={18} />
                                    Previous
                                </button>
                            )}

                            <button
                                onClick={handleMarkComplete}
                                disabled={marking || isCompleted}
                                className={`video-learn-complete-btn ${isCompleted ? 'completed' : ''}`}
                            >
                                <Check size={18} />
                                {marking ? "Processing..." : isCompleted ? "Completed" : "Mark Complete"}
                            </button>

                            {nextLesson && (
                                <button
                                    onClick={() => navigate(`/learn/${courseId}/${nextLesson._id || nextLesson.id}`)}
                                    className="video-learn-nav-btn video-learn-next-btn"
                                >
                                    Next
                                    <ChevronRight size={18} />
                                </button>
                            )}
                        </div>

                        {/* Notes Section */}
                        <div className="video-learn-notes">
                            <h2 className="video-learn-notes-title">
                                📝 Your Notes
                            </h2>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Take notes while watching..."
                                className="video-learn-notes-textarea"
                            />
                            <button
                                onClick={handleSaveNotes}
                                disabled={savingNotes}
                                className="video-learn-save-btn"
                            >
                                <Save size={16} />
                                {savingNotes ? "Saving..." : "Save Notes"}
                            </button>
                        </div>
                    </motion.div>
                </main>
            </div>

            <style>{`
                .video-learn {
                    min-height: calc(100vh - 4rem);
                }

                .video-learn-grid {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                }

                .video-learn-sidebar {
                    background: #141416;
                    border-right: 1px solid rgba(255, 255, 255, 0.06);
                    height: calc(100vh - 4rem);
                    display: flex;
                    flex-direction: column;
                    position: sticky;
                    top: 4rem;
                }

                .video-learn-sidebar-header {
                    padding: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .video-learn-course-link {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #a855f7;
                    font-size: 0.9rem;
                    text-decoration: none;
                }

                .video-learn-lessons {
                    flex: 1;
                    overflow-y: auto;
                    padding: 0.5rem;
                }

                .video-learn-lesson-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    color: #d1d1d1;
                    transition: all 0.2s;
                }

                .video-learn-lesson-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                .video-learn-lesson-item.active {
                    background: rgba(168, 85, 247, 0.15);
                    color: #a855f7;
                }

                .video-learn-lesson-item.completed .video-learn-lesson-num {
                    background: #22c55e;
                    color: white;
                }

                .video-learn-lesson-num {
                    width: 24px;
                    height: 24px;
                    background: #2a2a2d;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                }

                .video-learn-lesson-title {
                    flex: 1;
                    font-size: 0.9rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .video-learn-lesson-duration {
                    font-size: 0.75rem;
                    color: #6b6b6b;
                }

                .video-learn-progress {
                    padding: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .video-learn-progress-text {
                    font-size: 0.85rem;
                    color: #8a8a8a;
                    margin-bottom: 0.5rem;
                }

                .video-learn-progress-bar {
                    height: 4px;
                    background: #2a2a2d;
                    border-radius: 2px;
                    overflow: hidden;
                }

                .video-learn-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #a855f7, #22c55e);
                    transition: width 0.3s;
                }

                .video-learn-main {
                    padding: 2rem;
                }

                .video-learn-content {
                    max-width: 800px;
                    margin-top: 1.5rem;
                }

                .video-learn-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #f5f5f5;
                    margin: 0 0 1.5rem 0;
                }

                .video-learn-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin-bottom: 2rem;
                }

                .video-learn-nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.75rem 1rem;
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    color: #d1d1d1;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: none;
                }

                .video-learn-nav-btn:hover {
                    border-color: rgba(255, 255, 255, 0.2);
                    color: #f5f5f5;
                    transform: none;
                }

                .video-learn-complete-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: linear-gradient(135deg, #9333ea, #7c3aed);
                    border: none;
                    border-radius: 0.5rem;
                    color: white;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
                }

                .video-learn-complete-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(147, 51, 234, 0.4);
                }

                .video-learn-complete-btn.completed {
                    background: #22c55e;
                    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
                }

                .video-learn-complete-btn:disabled {
                    cursor: default;
                }

                .video-learn-notes {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }

                .video-learn-notes-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    margin: 0 0 1rem 0;
                }

                .video-learn-notes-textarea {
                    width: 100%;
                    min-height: 150px;
                    background: #1a1a1d;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    color: #f5f5f5;
                    font-size: 0.95rem;
                    resize: vertical;
                    outline: none;
                }

                .video-learn-notes-textarea:focus {
                    border-color: #a855f7;
                }

                .video-learn-save-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background: #22c55e;
                    border: none;
                    border-radius: 0.5rem;
                    color: white;
                    font-size: 0.9rem;
                    cursor: pointer;
                    box-shadow: none;
                }

                @media (max-width: 768px) {
                    .video-learn-grid {
                        grid-template-columns: 1fr;
                    }

                    .video-learn-sidebar {
                        display: none;
                    }

                    .video-learn-main {
                        padding: 1rem;
                    }
                }
            `}</style>
        </motion.div>
    );
}
