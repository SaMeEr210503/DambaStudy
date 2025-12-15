import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="min-h-screen grid grid-cols-12">
            <aside className="col-span-3 bg-gray-900 text-white p-6 space-y-4">
                <h1 className="text-xl font-semibold">Admin Panel</h1>

                <nav className="space-y-2">
                    <Link to="/admin" className="block hover:text-gray-300">Dashboard</Link>
                    <Link to="/admin/categories" className="block hover:text-gray-300">Categories</Link>
                    <Link to="/admin/courses" className="block hover:text-gray-300">Courses</Link>
                </nav>
            </aside>

            <main className="col-span-9 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
}
