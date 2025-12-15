import React from "react";
import { Link, useParams } from "react-router-dom";

/**
 * LessonList
 * Props:
 *  - lessons: [{ id, title, duration }]
 *  - courseId
 */
export default function LessonList({ lessons = [], courseId }) {
    const { lessonId } = useParams();

    return (
        <div className="bg-white rounded shadow p-3 space-y-2">
            <h2 className="font-semibold text-lg mb-2">Lessons</h2>
            {lessons.map(lesson => (
                <Link
                    key={lesson.id}
                    to={`/learn/${courseId}/${lesson.id}`}
                    className={`block p-2 rounded border ${lesson.id === lessonId ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"
                        }`}
                >
                    <div className="font-medium">{lesson.title}</div>
                    <div className="text-xs text-gray-500">{lesson.duration ?? ""}</div>
                </Link>
            ))}
        </div>
    );
}
