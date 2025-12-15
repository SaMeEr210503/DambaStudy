import React from "react";
import { Link } from "react-router-dom";

/**
 * DashboardContinue
 * Props:
 *  - items: [{ id, title, thumbnail, lessonId }]
 */
export default function DashboardContinue({ items = [] }) {
    if (!items.length)
        return null;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Continue Learning</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                    <Link
                        key={c.id}
                        to={`/learn/${c.id}/${c.lessonId}`}
                        className="bg-white rounded shadow overflow-hidden block"
                    >
                        <div className="h-32 bg-gray-100">
                            <img
                                src={c.thumbnail}
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="p-3 text-sm">
                            <div className="font-medium">{c.title}</div>
                            <div className="text-gray-500 text-xs">Resume course</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
