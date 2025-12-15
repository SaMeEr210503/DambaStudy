import React from "react";

/**
 * SyllabusAccordion
 * Props:
 *  - modules: [{ id, title, duration, lessons: [{ id, title, videoUrl }] }]
 */
export default function SyllabusAccordion({ modules = [] }) {
    return (
        <div className="space-y-2">
            {modules.map((mod) => (
                <details key={mod.id} className="bg-white border rounded">
                    <summary className="px-4 py-3 cursor-pointer flex justify-between items-center">
                        <div>
                            <div className="font-semibold">{mod.title}</div>
                            <div className="text-xs text-gray-500">{mod.duration ?? ""}</div>
                        </div>
                        <div className="text-sm text-gray-600">{mod.lessons ? `${mod.lessons.length} lessons` : ""}</div>
                    </summary>
                    <div className="p-3 border-t">
                        <ul className="space-y-2">
                            {(mod.lessons || []).map((lesson) => (
                                <li key={lesson.id} className="text-sm text-gray-700">
                                    {lesson.title} <span className="text-xs text-gray-400">({lesson.duration ?? "—"})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </details>
            ))}
        </div>
    );
}
