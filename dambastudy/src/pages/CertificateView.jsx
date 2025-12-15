import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { generateCertificatePDF } from "../utils/certificateGenerator";
import toast from "react-hot-toast";

export default function CertificateView() {
    const { certificateId } = useParams();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const res = await api.get(`/user/certificates/${certificateId}`);
                if (mounted) setCert(res.data);
            } catch {
                toast.error("Failed to load certificate");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, [certificateId]);

    async function handleDownload() {
        setDownloading(true);
        try {
            const bytes = await generateCertificatePDF({
                name: cert.studentName,
                courseTitle: cert.courseTitle,
                date: cert.date,
            });

            const blob = new Blob([bytes], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `Certificate-${cert.courseTitle}.pdf`;
            link.click();
            toast.success("Downloaded");
        } catch {
            toast.error("Error generating certificate");
        } finally {
            setDownloading(false);
        }
    }

    if (loading) return <div className="p-6 animate-pulse">Loading...</div>;

    if (!cert)
        return <div className="p-6 bg-red-50 text-red-700 rounded">Certificate not found.</div>;

    return (
        <div className="max-w-xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">{cert.courseTitle}</h1>
            <p className="text-gray-700">Issued to: {cert.studentName}</p>
            <p className="text-gray-700">Completed on: {cert.date}</p>

            <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {downloading ? "Generating…" : "Download PDF"}
            </button>
        </div>
    );
}
