import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

/**
 * CartContext
 * Stores:
 *  - cartItems: [{ _id, id, title, price, thumbnail, ... }]
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("damba_cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Save cart to localStorage
    useEffect(() => {
        try {
            localStorage.setItem("damba_cart", JSON.stringify(cartItems));
        } catch { }
    }, [cartItems]);

    function getItemId(item) {
        return item._id || item.id;
    }

    function addToCart(course) {
        const courseId = getItemId(course);

        if (cartItems.find((c) => getItemId(c) === courseId)) {
            toast("Already in cart", { icon: "🛒" });
            return false;
        }

        setCartItems([...cartItems, course]);
        return true;
    }

    function removeFromCart(courseId) {
        setCartItems(cartItems.filter((c) => getItemId(c) !== courseId));
        toast.success("Removed from cart");
    }

    function isInCart(courseId) {
        return cartItems.some((c) => getItemId(c) === courseId);
    }

    function clearCart() {
        setCartItems([]);
    }

    function getCartTotal() {
        return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            isInCart,
            getCartTotal,
            cartCount: cartItems.length
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
