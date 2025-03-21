"use client";

import { useState } from "react";

export default function DeletePropertyButton({ propertyId, refreshProperties }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("userToken");

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        setLoading(true);
        setError(null);

        const api_URL = "https://realestate.learnock.com/";
        const apiKey = 1234;

        try {
            const response = await fetch(`${api_URL}api/properties/${propertyId}`, {
                method: "DELETE",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,

                },
            });

            if (!response.ok) throw new Error("Failed to delete property");

            await refreshProperties();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
                {loading ? "Deleting..." : "Delete"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
