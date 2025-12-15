import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    BookOpen,
    ShoppingCart,
    Search,
    Award,
    Inbox
} from "lucide-react";
import { itemVariants } from "../utils/motionVariants";

const icons = {
    courses: BookOpen,
    cart: ShoppingCart,
    search: Search,
    certificates: Award,
    default: Inbox,
};

export default function EmptyState({
    icon = "default",
    title = "Nothing here yet",
    description = "There's nothing to display at the moment.",
    actionLabel,
    actionLink,
    onAction,
}) {
    const IconComponent = icons[icon] || icons.default;

    return (
        <motion.div
            className="empty-state"
            variants={itemVariants}
            initial="initial"
            animate="animate"
        >
            <div className="empty-state-icon">
                <IconComponent size={48} strokeWidth={1.5} />
            </div>

            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-description">{description}</p>

            {(actionLabel && (actionLink || onAction)) && (
                actionLink ? (
                    <Link to={actionLink} className="empty-state-action">
                        {actionLabel}
                    </Link>
                ) : (
                    <button onClick={onAction} className="empty-state-action">
                        {actionLabel}
                    </button>
                )
            )}

            <style>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          text-align: center;
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
        }

        .empty-state-icon {
          color: #4a4a4d;
          margin-bottom: 1.5rem;
        }

        .empty-state-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #d1d1d1;
          margin: 0 0 0.5rem 0;
        }

        .empty-state-description {
          font-size: 0.95rem;
          color: #8a8a8a;
          margin: 0 0 1.5rem 0;
          max-width: 300px;
          line-height: 1.5;
        }

        .empty-state-action {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #9333ea, #7c3aed);
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 0.5rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
        }

        .empty-state-action:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(147, 51, 234, 0.4);
        }
      `}</style>
        </motion.div>
    );
}
