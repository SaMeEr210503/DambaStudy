import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    async function load() {
        try {
            const res = await api.get("/admin/courses");
            setCourses(res.data || []);
        } catch {
            toast.error("Failed to load courses");
        }
    }

    useEffect(() => { load(); }, []);

    async function createCourse() {
        if (!title.trim()) return toast.error("Title is required");
        try {
            await api.post("/admin/courses", {
                title,
                price: Number(price) || 0
            });
            toast.success("Course created");
            setTitle("");
            setPrice("");
            load();
        } catch {
            toast.error("Failed to create");
        }
    }

    async function deleteCourse(id) {
        try {
            await api.delete(`/admin/courses/${id}`);
            toast("Deleted");
            load();
        } catch {
            toast.error("Failed to delete");
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Manage Courses</h1>

            <div className="flex gap-2 mb-6">
                <input
                    placeholder="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded flex-1"
                />
                <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded w-28"
                />
                <button onClick={createCourse} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {courses.map((c) => (
                    <li key={c.id} className="bg-white p-3 rounded shadow flex justify-between">
                        <div>
                            <div className="font-semibold">{c.title}</div>
                            <div className="text-sm text-gray-600">Price: ₹{c.price}</div>
                        </div>
                        <div className="flex gap-3">
                            <Link to={`/admin/courses/${c.id}`} className="text-blue-600">Edit</Link>
                            <button onClick={() => deleteCourse(c.id)} className="text-red-600">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
