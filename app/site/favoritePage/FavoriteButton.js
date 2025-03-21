"use client";
import { useState, useEffect } from "react";
import { getUserToken } from "@/app/userRole/getUserToken";
import { useProfile } from "@/app/context/profileContext";

export default function FavoriteButton({ favoritableId, favoritableType }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const apiKey = 1234;
    const { profile } = useProfile();

    // Ensure correct format
    const formattedType = favoritableType.toLowerCase();

    useEffect(() => {
        if (profile?.data?.id) {
            checkFavoriteStatus();
        }
    }, [profile?.data?.id]); // ✅ Run when profile loads

    const checkFavoriteStatus = async () => {
        if (!profile?.data?.id) return; // ✅ Avoid running if user ID is missing

        const token = await getUserToken();
        try {
            const response = await fetch(`https://realestate.learnock.com/api/favorites/${profile.data.id}`, {
                method: "GET",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log("Favorites API Response:", data); // ✅ Debugging API response

            if (response.ok && Array.isArray(data.data)) {
                const favoriteExists = data.data.some(
                    (fav) => fav.favoritable_id === favoritableId && fav.favoritable_type.toLowerCase() === formattedType
                );
                setIsFavorite(favoriteExists);
            } else {
                setIsFavorite(false);
            }
        } catch (error) {
            console.error("Error checking favorite status:", error);
        }
    };

    const toggleFavorite = async () => {
        setLoading(true);
        const token = await getUserToken();
        const url = isFavorite
            ? "https://realestate.learnock.com/api/favorites/delete"
            : "https://realestate.learnock.com/api/favorites/add";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    favoritable_id: favoritableId,
                    favoritable_type: formattedType, // ✅ Ensure lowercase consistency
                }),
            });

            const data = await response.json();
            console.log("Toggle Favorite Response:", data); // ✅ Debugging API response

            if (response.ok) {
                setIsFavorite(!isFavorite); // ✅ Immediately update UI
            } else {
                console.error("Error updating favorite:", data.message);
            }
        } catch (error) {
            console.error("Favorite toggle error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 w-full"> {/* Ensure margin and full width */}
            <button
                onClick={toggleFavorite}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                    isFavorite ? "bg-gray-500 text-white hover:bg-gray-600" : "bg-red-500 text-white hover:bg-red-600"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
            >
                {loading ? "Processing..." : isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
}
