import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function AddToCartButton({ course, variant = "default", showPrice = false }) {
    const { addToCart, isInCart } = useCart();
    const navigate = useNavigate();

    if (!course) return null;

    const courseId = course._id || course.id;
    const inCart = isInCart(courseId);

    function handleClick() {
        if (inCart) {
            navigate("/cart");
        } else {
            const success = addToCart(course);
            if (success) {
                toast.success("Added to cart!");
            }
        }
    }

    const baseStyles = {
        default: `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            font-size: 0.9rem;
            font-weight: 600;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            border: none;
        `,
        compact: `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
            font-weight: 500;
            border-radius: 0.375rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            border: none;
        `,
    };

    const colorStyles = inCart
        ? `
            background: #22c55e;
            color: white;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        `
        : `
            background: linear-gradient(135deg, #9333ea, #7c3aed);
            color: white;
            box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
        `;

    return (
        <>
            <button
                onClick={handleClick}
                className="add-to-cart-btn"
            >
                {inCart ? (
                    <>
                        <Check size={variant === "compact" ? 14 : 16} />
                        In Cart
                    </>
                ) : (
                    <>
                        <ShoppingCart size={variant === "compact" ? 14 : 16} />
                        {showPrice && course.price ? (
                            `Add • ₹${course.price.toLocaleString()}`
                        ) : (
                            "Add to Cart"
                        )}
                    </>
                )}
            </button>

            <style>{`
                .add-to-cart-btn {
                    ${baseStyles[variant] || baseStyles.default}
                    ${colorStyles}
                }

                .add-to-cart-btn:hover {
                    transform: translateY(-1px);
                    ${inCart ? `
                        box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
                    ` : `
                        box-shadow: 0 6px 16px rgba(147, 51, 234, 0.4);
                    `}
                }
            `}</style>
        </>
    );
}
