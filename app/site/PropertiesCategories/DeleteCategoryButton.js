"use client";

import { useEffect, useState } from "react";

export default function DeleteCategoryButton({ type, categoryId }) {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const [token, setToken] = useState(null)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("userToken"));
        }
    }, []);
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        const endpoint = type === "types"
            ? `${api_URL}api/${type}/${categoryId}`
            : `${api_URL}api/${type}/categories/${categoryId}`;

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            alert("Category deleted successfully");
            window.location.reload();
        } else {
            alert("Failed to delete category");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="w-1/9 text-center bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
            Delete
        </button>
    );
}
