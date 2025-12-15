import React from "react";
import CourseCard from "../CourseCard";

export default function PopularCourses({ courses = [] }) {
    if (!courses.length)
        return <div className="text-gray-500">No popular courses.</div>;

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
                <CourseCard key={c._id || c.id} course={c} />
            ))}
        </div>
    );
}
