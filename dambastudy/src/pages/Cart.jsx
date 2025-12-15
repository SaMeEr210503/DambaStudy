import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";
import { pageVariants, itemVariants, containerVariants } from "../utils/motionVariants";

export default function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, c) => sum + (c.price || 0), 0);

    if (!cartItems.length) {
        return (
            <motion.div
                className="cart-page"
                variants={pageVariants}
                initial="initial"
                animate="animate"
            >
                <EmptyState
                    icon="cart"
                    title="Your cart is empty"
                    description="Looks like you haven't added any courses yet"
                    actionLabel="Browse Courses"
                    actionLink="/courses"
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            className="cart-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <h1 className="cart-title">
                <ShoppingCart size={28} />
                Your Cart
                <span className="cart-count">{cartItems.length} items</span>
            </h1>

            <div className="cart-grid">
                {/* Cart Items */}
                <motion.div
                    className="cart-items"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {cartItems.map((course) => (
                        <motion.div
                            key={course._id || course.id}
                            className="cart-item"
                            variants={itemVariants}
                        >
                            <img
                                src={course.thumbnail || "https://picsum.photos/160/100"}
                                alt={course.title}
                                className="cart-item-img"
                            />
                            <div className="cart-item-info">
                                <Link
                                    to={`/courses/${course._id || course.id}`}
                                    className="cart-item-title"
                                >
                                    {course.title}
                                </Link>
                                <p className="cart-item-instructor">
                                    {course.instructor?.name || "DambaStudy Instructor"}
                                </p>
                                <div className="cart-item-meta">
                                    <span className="cart-item-rating">
                                        ⭐ {course.rating || "4.5"}
                                    </span>
                                    <span className="cart-item-level">
                                        {course.level || "Beginner"}
                                    </span>
                                </div>
                            </div>
                            <div className="cart-item-actions">
                                <span className="cart-item-price">
                                    ₹{course.price?.toLocaleString() || "Free"}
                                </span>
                                <button
                                    onClick={() => removeFromCart(course._id || course.id)}
                                    className="cart-item-remove"
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Summary */}
                <div className="cart-summary">
                    <h2 className="cart-summary-title">Order Summary</h2>

                    <div className="cart-summary-row">
                        <span>Subtotal ({cartItems.length} courses)</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <div className="cart-summary-row">
                        <span>Discount</span>
                        <span className="cart-discount">-₹0</span>
                    </div>

                    <div className="cart-summary-total">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="cart-checkout-btn"
                    >
                        Proceed to Checkout
                        <ArrowRight size={18} />
                    </button>

                    <Link to="/courses" className="cart-continue">
                        Continue Shopping
                    </Link>
                </div>
            </div>

            <style>{`
                .cart-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1.5rem;
                    min-height: 60vh;
                }

                .cart-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f5f5f5;
                    margin: 0 0 2rem 0;
                }

                .cart-count {
                    font-size: 1rem;
                    font-weight: 500;
                    color: #8a8a8a;
                    margin-left: auto;
                }

                .cart-grid {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 2rem;
                }

                .cart-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .cart-item {
                    display: flex;
                    gap: 1rem;
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    padding: 1rem;
                    transition: all 0.2s ease;
                }

                .cart-item:hover {
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .cart-item-img {
                    width: 140px;
                    height: 90px;
                    object-fit: cover;
                    border-radius: 0.5rem;
                    flex-shrink: 0;
                }

                .cart-item-info {
                    flex: 1;
                    min-width: 0;
                }

                .cart-item-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    text-decoration: none;
                    display: block;
                    margin-bottom: 0.25rem;
                }

                .cart-item-title:hover {
                    color: #a855f7;
                }

                .cart-item-instructor {
                    font-size: 0.85rem;
                    color: #8a8a8a;
                    margin: 0 0 0.5rem 0;
                }

                .cart-item-meta {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.8rem;
                }

                .cart-item-rating {
                    color: #fbbf24;
                }

                .cart-item-level {
                    color: #8a8a8a;
                }

                .cart-item-actions {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.5rem;
                }

                .cart-item-price {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #a855f7;
                }

                .cart-item-remove {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: transparent;
                    border: none;
                    color: #ef4444;
                    font-size: 0.8rem;
                    cursor: pointer;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    transition: background 0.2s;
                    box-shadow: none;
                }

                .cart-item-remove:hover {
                    background: rgba(239, 68, 68, 0.1);
                    transform: none;
                }

                .cart-summary {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    height: fit-content;
                    position: sticky;
                    top: 6rem;
                }

                .cart-summary-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    margin: 0 0 1.5rem 0;
                }

                .cart-summary-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    color: #d1d1d1;
                    font-size: 0.95rem;
                }

                .cart-discount {
                    color: #22c55e;
                }

                .cart-summary-total {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #f5f5f5;
                }

                .cart-checkout-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: linear-gradient(135deg, #9333ea, #7c3aed);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(147, 51, 234, 0.35);
                    transition: all 0.2s ease;
                }

                .cart-checkout-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(147, 51, 234, 0.45);
                }

                .cart-continue {
                    display: block;
                    text-align: center;
                    margin-top: 1rem;
                    color: #a855f7;
                    font-size: 0.9rem;
                    text-decoration: none;
                }

                .cart-continue:hover {
                    color: #c084fc;
                }

                @media (max-width: 768px) {
                    .cart-grid {
                        grid-template-columns: 1fr;
                    }

                    .cart-item {
                        flex-direction: column;
                    }

                    .cart-item-img {
                        width: 100%;
                        height: 160px;
                    }

                    .cart-item-actions {
                        flex-direction: row;
                        justify-content: space-between;
                        width: 100%;
                    }
                }
            `}</style>
        </motion.div>
    );
}
