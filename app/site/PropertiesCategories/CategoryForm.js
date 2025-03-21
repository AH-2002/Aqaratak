"use client"
import { useState } from "react";
import { getUserToken } from "@/app/userRole/getUserToken";

export default function CategoryForm({ type, onClose }) {
    const [nameEn, setNameEn] = useState("");
    const [nameAr, setNameAr] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const api_URL = "https://realestate.learnock.com/";
            const apiKey = 1234;
            const token = await getUserToken();

            const endpoint = type === "types" ? `${api_URL}api/${type}` : `${api_URL}api/${type}/categories`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name_en: nameEn,
                    name_ar: nameAr,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Category added successfully!");
                onClose(); // Close form
                window.location.reload(); // Reload the page
            } else {
                setError(data.message || "Failed to add category.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Add New Category</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category Name (English)</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={nameEn}
                            onChange={(e) => setNameEn(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Category Name (Arabic)</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={nameAr}
                            onChange={(e) => setNameAr(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
