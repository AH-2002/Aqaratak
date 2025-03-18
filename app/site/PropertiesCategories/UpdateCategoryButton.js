"use client";
import { useState } from "react";
import { getUserToken } from "@/app/userRole/getUserToken";
import { useRouter } from "next/navigation";

export default function UpdateCategoryButton({ type, category }) {
    const [isEditing, setIsEditing] = useState(false);
    const [nameEn, setNameEn] = useState(category.name_en);
    const [nameAr, setNameAr] = useState(category.name_ar);
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const router = useRouter();

    // Define handleUpdate outside of the condition
    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = await getUserToken();
        const endpoint = type === "types"
            ? `${api_URL}api/${type}/${category.id}`
            : `${api_URL}api/${type}/categories/${category.id}`;

        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name_en: nameEn, name_ar: nameAr }),
        });

        if (response.ok) {
            alert("Category updated successfully");
            setIsEditing(false);
            router.refresh(); // Reload server component
        } else {
            alert("Failed to update category");
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
