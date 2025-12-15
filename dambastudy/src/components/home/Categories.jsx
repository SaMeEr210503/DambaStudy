import React from "react";
import { Link } from "react-router-dom";

export default function Categories({ items = [] }) {
    if (!items.length)
        return <div className="text-gray-500 text-sm">No categories yet.</div>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((cat) => (
                <Link
                    key={cat.id}
                    to={`/courses?category=${cat.id}`}
                    className="bg-white p-4 rounded shadow text-center hover:bg-gray-50"
                >
                    <div className="font-semibold">{cat.name}</div>
                </Link>
            ))}
        </div>
    );
}
