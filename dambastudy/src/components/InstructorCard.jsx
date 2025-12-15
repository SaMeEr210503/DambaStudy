import React from "react";

/**
 * InstructorCard
 * Props:
 *  - instructor: { name, avatar, bio, rating }
 */
export default function InstructorCard({ instructor }) {
    if (!instructor) return null;
    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center space-x-3">
                <img src={instructor.avatar || "/vite.svg"} alt={instructor.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                    <div className="font-semibold">{instructor.name}</div>
                    <div className="text-xs text-gray-500">Rating: {instructor.rating ?? "—"}</div>
                </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">{instructor.bio ?? "No bio available."}</p>
        </div>
    );
}
