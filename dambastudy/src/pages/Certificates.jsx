import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Certificates() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const res = await api.get("/user/certificates");
                if (mounted) setCerts(res.data || []);
            } catch {
                toast.error("Failed to load certificates");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, []);

    if (loading) return <div className="p-6 animate-pulse">Loading certificates...</div>;

    if (!certs.length)
        return (
            <div className="p-6 bg-yellow-50 text-yellow-700 rounded">
                No certificates yet.
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold mb-4">Your Certificates</h1>
            {certs.map((c) => (
                <Link
                    key={c.id}
                    to={`/certificates/${c.id}`}
                    className="block p-4 bg-white rounded shadow hover:bg-gray-50"
                >
                    <div className="font-semibold">{c.courseTitle}</div>
                    <div className="text-sm text-gray-500">Completed: {c.date}</div>
                </Link>
            ))}
        </div>
    );
}
