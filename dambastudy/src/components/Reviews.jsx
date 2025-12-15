import React from "react";

/**
 * Reviews
 * Props:
 *  - reviews: [{ id, user: { name }, rating, comment, createdAt }]
 */
export default function Reviews({ reviews = [] }) {
    if (!reviews || reviews.length === 0) {
        return <div className="p-4 bg-yellow-50 text-yellow-800 rounded">No reviews yet.</div>;
    }
    return (
        <div className="space-y-4">
            {reviews.map(r => (
                <div key={r.id} className="bg-white p-3 rounded shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{r.user?.name ?? "Anonymous"}</div>
                        <div className="text-xs text-gray-500">⭐ {r.rating ?? "—"}</div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{r.comment}</p>
                    <div className="text-xs text-gray-400 mt-2">{new Date(r.createdAt || Date.now()).toLocaleString()}</div>
                </div>
            ))}
        </div>
    );
}
