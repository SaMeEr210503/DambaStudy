import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    async function load() {
        try {
            const res = await api.get("/admin/categories");
            setCategories(res.data || []);
        } catch {
            toast.error("Failed to load categories");
        }
    }

    useEffect(() => { load(); }, []);

    async function createCategory() {
        if (!name.trim()) return toast.error("Enter a valid name");
        try {
            await api.post("/admin/categories", { name });
            toast.success("Category created");
            setName("");
            load();
        } catch {
            toast.error("Failed to create");
        }
    }

    async function deleteCategory(id) {
        try {
            await api.delete(`/admin/categories/${id}`);
            toast("Deleted");
            load();
        } catch {
            toast.error("Delete failed");
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Manage Categories</h1>

            <div className="flex gap-2 mb-6">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New category name"
                    className="border p-2 flex-1 rounded"
                />
                <button onClick={createCategory} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {categories.map((c) => (
                    <li
                        key={c.id}
                        className="bg-white p-3 rounded shadow flex justify-between"
                    >
                        <span>{c.name}</span>
                        <button onClick={() => deleteCategory(c.id)} className="text-red-600">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
