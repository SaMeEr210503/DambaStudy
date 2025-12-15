import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Award,
    Clock,
    TrendingUp,
    Play,
    ChevronRight,
    BarChart3,
    Target
} from "lucide-react";
import api from "../utils/api";
import DashboardMyCourses from "../components/dashboard/DashboardMyCourses";
import DashboardContinue from "../components/dashboard/DashboardContinue";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { pageVariants, containerVariants, itemVariants, cardVariants } from "../utils/motionVariants";

export default function Dashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [myCourses, setMyCourses] = useState([]);
    const [continueItems, setContinueItems] = useState([]);
    const [stats, setStats] = useState({
        enrolledCourses: 0,
        certificates: 0,
        hoursLearned: 0,
        progress: 0,
    });

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                setLoading(true);
                const res = await api.get("/user/courses");
                const data = res.data || {};

                if (!mounted) return;

                const courses = data.myCourses ?? data ?? [];
                setMyCourses(Array.isArray(courses) ? courses : []);
                setContinueItems(data.continueLearning ?? []);

                // Mock stats - replace with real API data
                setStats({
                    enrolledCourses: Array.isArray(courses) ? courses.length : 0,
                    certificates: 2,
                    hoursLearned: 24,
                    progress: 68,
                });
            } catch (err) {
                console.error("dashboard error", err);
                toast.error("Failed to load dashboard");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false };
    }, []);

    const statCards = [
        {
            icon: BookOpen,
            label: "Enrolled Courses",
            value: stats.enrolledCourses,
            color: "#a855f7",
        },
        {
            icon: Award,
            label: "Certificates Earned",
            value: stats.certificates,
            color: "#22c55e",
        },
        {
            icon: Clock,
            label: "Hours Learned",
            value: `${stats.hoursLearned}h`,
            color: "#3b82f6",
        },
        {
            icon: Target,
            label: "Avg. Progress",
            value: `${stats.progress}%`,
            color: "#f59e0b",
        },
    ];

    return (
        <motion.div
            className="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            {/* Header */}
            <div className="dashboard-header">
                <motion.div variants={itemVariants}>
                    <h1 className="dashboard-title">
                        Welcome back, <span className="dashboard-name">{user?.name ?? "Student"}</span>
                    </h1>
                    <p className="dashboard-subtitle">
                        Continue your learning journey
                    </p>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
                className="dashboard-stats"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="dashboard-stat-card"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div
                            className="dashboard-stat-icon"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            <stat.icon size={24} />
                        </div>
                        <div className="dashboard-stat-content">
                            <span className="dashboard-stat-value">{stat.value}</span>
                            <span className="dashboard-stat-label">{stat.label}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Continue Learning */}
            {continueItems.length > 0 && (
                <motion.section
                    className="dashboard-section"
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <div className="dashboard-section-header">
                        <h2 className="dashboard-section-title">
                            <Play size={20} />
                            Continue Learning
                        </h2>
                        <Link to="/courses" className="dashboard-section-link">
                            View All <ChevronRight size={16} />
                        </Link>
                    </div>
                    <DashboardContinue items={continueItems} />
                </motion.section>
            )}

            {/* My Courses */}
            <motion.section
                className="dashboard-section"
                variants={containerVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                <div className="dashboard-section-header">
                    <h2 className="dashboard-section-title">
                        <BookOpen size={20} />
                        My Courses
                    </h2>
                    <Link to="/courses" className="dashboard-section-link">
                        Browse Courses <ChevronRight size={16} />
                    </Link>
                </div>

                {loading ? (
                    <div className="dashboard-skeleton-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="dashboard-skeleton-card" />
                        ))}
                    </div>
                ) : myCourses.length > 0 ? (
                    <DashboardMyCourses courses={myCourses} />
                ) : (
                    <motion.div className="dashboard-empty" variants={itemVariants}>
                        <BookOpen size={48} strokeWidth={1} />
                        <h3>No courses yet</h3>
                        <p>Start your learning journey by enrolling in a course</p>
                        <Link to="/courses" className="dashboard-empty-cta">
                            Explore Courses
                        </Link>
                    </motion.div>
                )}
            </motion.section>

            {/* Quick Actions */}
            <motion.section
                className="dashboard-section"
                variants={itemVariants}
            >
                <h2 className="dashboard-section-title">
                    <TrendingUp size={20} />
                    Quick Actions
                </h2>
                <div className="dashboard-actions">
                    <Link to="/courses" className="dashboard-action">
                        <BarChart3 size={20} />
                        Browse Courses
                    </Link>
                    <Link to="/certificates" className="dashboard-action">
                        <Award size={20} />
                        View Certificates
                    </Link>
                    <Link to="/profile" className="dashboard-action">
                        <Target size={20} />
                        Edit Profile
                    </Link>
                </div>
            </motion.section>

            <style>{`
        .dashboard {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 0.5rem 0;
        }

        .dashboard-name {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-subtitle {
          font-size: 1rem;
          color: #8a8a8a;
          margin: 0;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .dashboard-stat-card {
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s ease;
        }

        .dashboard-stat-card:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .dashboard-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dashboard-stat-content {
          display: flex;
          flex-direction: column;
        }

        .dashboard-stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        .dashboard-stat-label {
          font-size: 0.85rem;
          color: #8a8a8a;
          margin-top: 0.25rem;
        }

        .dashboard-section {
          margin-bottom: 2.5rem;
        }

        .dashboard-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .dashboard-section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0;
        }

        .dashboard-section-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          color: #a855f7;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .dashboard-section-link:hover {
          color: #c084fc;
        }

        .dashboard-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .dashboard-skeleton-card {
          height: 120px;
          background: linear-gradient(90deg, #141416 0%, #1a1a1d 50%, #141416 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite ease-in-out;
          border-radius: 1rem;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .dashboard-empty {
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 3rem;
          text-align: center;
          color: #6b6b6b;
        }

        .dashboard-empty h3 {
          font-size: 1.25rem;
          color: #d1d1d1;
          margin: 1rem 0 0.5rem;
        }

        .dashboard-empty p {
          color: #8a8a8a;
          margin: 0 0 1.5rem;
        }

        .dashboard-empty-cta {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dashboard-empty-cta:hover {
          box-shadow: 0 8px 24px rgba(147, 51, 234, 0.4);
        }

        .dashboard-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .dashboard-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 0.75rem;
          color: #d1d1d1;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dashboard-action:hover {
          background: #1a1a1d;
          border-color: rgba(255, 255, 255, 0.1);
          color: #f5f5f5;
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1.5rem 1rem;
          }

          .dashboard-title {
            font-size: 1.5rem;
          }

          .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-stat-card {
            padding: 1rem;
          }

          .dashboard-stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
        </motion.div>
    );
}
