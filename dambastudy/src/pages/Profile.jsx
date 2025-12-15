import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email] = useState(user?.email || "");
    const [saving, setSaving] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordSaving, setPasswordSaving] = useState(false);

    async function handleSaveProfile() {
        setSaving(true);
        try {
            const res = await api.put("/user/profile", { name });
            setUser((u) => ({ ...u, name }));
            toast.success("Profile updated");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update");
        } finally {
            setSaving(false);
        }
    }

    async function handlePasswordChange() {
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setPasswordSaving(true);
        try {
            await api.put("/user/change-password", { password });
            setPassword("");
            toast.success("Password updated");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Password update failed");
        } finally {
            setPasswordSaving(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Profile</h1>

            <div className="bg-white p-4 rounded shadow space-y-4">
                <h2 className="font-semibold text-lg">User Information</h2>

                <div>
                    <label className="text-sm">Name</label>
                    <input
                        className="w-full border p-2 rounded mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm">Email</label>
                    <input
                        className="w-full border p-2 rounded mt-1 bg-gray-100"
                        value={email}
                        disabled
                    />
                </div>

                <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {saving ? "Saving…" : "Save Profile"}
                </button>
            </div>

            <div className="bg-white p-4 rounded shadow space-y-4">
                <h2 className="font-semibold text-lg">Change Password</h2>

                <input
                    type="password"
                    placeholder="New password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handlePasswordChange}
                    disabled={passwordSaving}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    {passwordSaving ? "Updating…" : "Update Password"}
                </button>
            </div>
        </div>
    );
}
