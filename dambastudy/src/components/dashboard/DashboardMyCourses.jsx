import React from "react";
import { Link } from "react-router-dom";

/**
 * DashboardMyCourses
 * Props:
 *  - courses: [{ id, title, thumbnail, progress }]
 */
export default function DashboardMyCourses({ courses = [] }) {
    if (!courses.length)
        return (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
                You have not enrolled in any courses yet.
            </div>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
                <Link
                    key={c.id}
                    to={`/learn/${c.id}/${c.nextLessonId ?? 1}`}
                    className="block bg-white shadow rounded overflow-hidden"
                >
                    <div className="h-36 bg-gray-100 overflow-hidden">
                        <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="font-semibold text-lg mb-1">{c.title}</h3>
                        <div className="text-sm text-gray-500">
                            Progress: {c.progress ?? 0}%
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded mt-2">
                            <div
                                className="bg-blue-600 h-2 rounded"
                                style={{ width: `${c.progress ?? 0}%` }}
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
