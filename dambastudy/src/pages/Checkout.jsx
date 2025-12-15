import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { pageVariants, itemVariants } from "../utils/motionVariants";

export default function Checkout() {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    const total = cartItems.reduce((sum, c) => sum + (c.price || 0), 0);

    async function handleCheckout() {
        if (!user) {
            navigate(`/login?from=/checkout`);
            return;
        }

        setProcessing(true);
        try {
            await api.post("/enroll/multiple", {
                courses: cartItems.map(c => c._id || c.id)
            });

            toast.success("Enrollment successful! 🎉");
            clearCart();
            navigate("/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Checkout failed");
        } finally {
            setProcessing(false);
        }
    }

    if (!cartItems.length) {
        return (
            <motion.div
                className="checkout-empty"
                variants={pageVariants}
                initial="initial"
                animate="animate"
            >
                <ShoppingBag size={48} strokeWidth={1.5} />
                <h2>Your cart is empty</h2>
                <p>Add some courses to proceed with checkout</p>
                <button onClick={() => navigate("/courses")} className="checkout-browse-btn">
                    Browse Courses
                </button>

                <style>{`
                    .checkout-empty {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        color: #8a8a8a;
                        padding: 2rem;
                    }
                    .checkout-empty h2 {
                        color: #f5f5f5;
                        margin: 1rem 0 0.5rem;
                    }
                    .checkout-empty p {
                        margin: 0 0 1.5rem;
                    }
                    .checkout-browse-btn {
                        padding: 0.75rem 1.5rem;
                        background: linear-gradient(135deg, #9333ea, #7c3aed);
                        color: white;
                        font-weight: 600;
                        border-radius: 0.5rem;
                        border: none;
                        cursor: pointer;
                    }
                `}</style>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="checkout"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-grid">
                {/* Order Summary */}
                <div className="checkout-summary">
                    <h2 className="checkout-section-title">Order Summary</h2>

                    <div className="checkout-items">
                        {cartItems.map(c => (
                            <motion.div
                                key={c._id || c.id}
                                className="checkout-item"
                                variants={itemVariants}
                            >
                                <img
                                    src={c.thumbnail || "https://picsum.photos/100/70"}
                                    alt={c.title}
                                    className="checkout-item-img"
                                />
                                <div className="checkout-item-info">
                                    <h3>{c.title}</h3>
                                    <p>{c.instructor?.name || "DambaStudy Instructor"}</p>
                                </div>
                                <span className="checkout-item-price">
                                    ₹{c.price?.toLocaleString() || "Free"}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="checkout-total-section">
                        <div className="checkout-total-row">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <div className="checkout-total-row">
                            <span>Discount</span>
                            <span className="checkout-discount">-₹0</span>
                        </div>
                        <div className="checkout-total-row checkout-grand-total">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Payment */}
                <div className="checkout-payment">
                    <h2 className="checkout-section-title">
                        <CreditCard size={20} />
                        Payment
                    </h2>

                    <div className="checkout-payment-info">
                        <p>This is a demo checkout. Click the button below to complete your enrollment.</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className="checkout-btn"
                    >
                        {processing ? (
                            <span className="checkout-btn-loading">
                                Processing...
                            </span>
                        ) : (
                            <>
                                <Check size={18} />
                                Complete Enrollment • ₹{total.toLocaleString()}
                            </>
                        )}
                    </button>

                    <p className="checkout-secure">
                        🔒 Secure checkout powered by DambaStudy
                    </p>
                </div>
            </div>

            <style>{`
                .checkout {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 2rem 1.5rem;
                }

                .checkout-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f5f5f5;
                    margin: 0 0 2rem 0;
                }

                .checkout-grid {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 2rem;
                }

                .checkout-summary,
                .checkout-payment {
                    background: #141416;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }

                .checkout-section-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    margin: 0 0 1.5rem 0;
                }

                .checkout-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .checkout-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .checkout-item:last-child {
                    border-bottom: none;
                }

                .checkout-item-img {
                    width: 80px;
                    height: 56px;
                    object-fit: cover;
                    border-radius: 0.5rem;
                }

                .checkout-item-info {
                    flex: 1;
                }

                .checkout-item-info h3 {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #f5f5f5;
                    margin: 0 0 0.25rem 0;
                }

                .checkout-item-info p {
                    font-size: 0.8rem;
                    color: #8a8a8a;
                    margin: 0;
                }

                .checkout-item-price {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #a855f7;
                }

                .checkout-total-section {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .checkout-total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    color: #d1d1d1;
                    font-size: 0.95rem;
                }

                .checkout-discount {
                    color: #22c55e;
                }

                .checkout-grand-total {
                    margin-top: 1rem;
                    padding-top: 0.75rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #f5f5f5;
                }

                .checkout-payment-info {
                    background: rgba(168, 85, 247, 0.1);
                    border: 1px solid rgba(168, 85, 247, 0.2);
                    border-radius: 0.75rem;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                }

                .checkout-payment-info p {
                    color: #c4b5fd;
                    font-size: 0.9rem;
                    margin: 0;
                }

                .checkout-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.35);
                    transition: all 0.2s ease;
                }

                .checkout-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(34, 197, 94, 0.45);
                }

                .checkout-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .checkout-secure {
                    text-align: center;
                    color: #8a8a8a;
                    font-size: 0.85rem;
                    margin: 1rem 0 0;
                }

                @media (max-width: 768px) {
                    .checkout-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </motion.div>
    );
}
