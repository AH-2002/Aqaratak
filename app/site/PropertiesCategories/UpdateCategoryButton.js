"use client";
import { useState } from "react";

export default function UpdateCategoryButton({ type, category }) {
    const [isEditing, setIsEditing] = useState(false);
    const [nameEn, setNameEn] = useState(category.name_en || "");
    const [nameAr, setNameAr] = useState(category.name_ar || "");
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    // Define handleUpdate outside of the condition
    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("userToken");
        const endpoint = type === "types"
            ? `${api_URL}api/${type}/${category.id}`
            : `${api_URL}api/${type}/categories/${category.id}`;

        const payload = { name_en: nameEn, name_ar: nameAr };
        console.log("Sending update request:", payload);

        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log("Response Data:", responseData);

            if (!response.ok) throw new Error(responseData.message || "Failed to update category");

            alert("Category updated successfully");
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            alert("Error updating category: " + error.message);
        }
    };


    return (
        <>
            {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className="w-1/9 text-center bg-blue-500 text-white py-1 px-3 mx-4 rounded hover:bg-blue-600"
                >
                    Update
                </button>
            ) : (
                <form onSubmit={handleUpdate} className="flex space-x-2">
                    <input
                        type="text"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                        className="border p-1 rounded"
                        required
                        placeholder="English"
                    />
                    <input
                        type="text"
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        className="border p-1 rounded"
                        required
                        placeholder="Arabic"
                    />
                    <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </>
    );
}
