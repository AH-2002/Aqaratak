"use client";
import { useState, useEffect } from "react";
import { getUserToken } from "@/app/userRole/getUserToken";
import Image from "next/image";
import { useProfile } from "@/app/context/profileContext";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("all"); // "all", "property", "service"
    const { profile } = useProfile();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const userId = profile?.data?.id;

    useEffect(() => {
        if (userId) {
            fetchFavorites(userId);
        }
    }, [userId]);

    const fetchFavorites = async (id) => {
        const token = await getUserToken();
        try {
            const response = await fetch(`https://realestate.learnock.com/api/favorites/${id}`, {
                method: "GET",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log("Favorites API Response:", data); // Debugging

            if (response.ok) {
                setFavorites(data.data || []);
            } else {
                console.error("Failed to fetch favorites:", data.message);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (favoritableId, favoritableType) => {
        const token = await getUserToken();

        // Ensure correct format for favoritable_type
        const formattedType = favoritableType.toLowerCase() === "app\\models\\property" ? "property" : "service";

        console.log("Sending DELETE request with:", {
            favoritable_id: favoritableId,
            favoritable_type: formattedType
        });

        try {
            const response = await fetch("https://realestate.learnock.com/api/favorites/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    favoritable_id: favoritableId,
                    favoritable_type: formattedType,
                }),
            });

            const data = await response.json();
            console.log("Delete Response:", data); // Debugging

            if (response.ok) {
                setFavorites(favorites.filter(fav => !(fav.favoritable_id === favoritableId && fav.favoritable_type === favoritableType)));
                console.log("Favorite removed successfully");
            } else {
                console.error("Failed to remove favorite:", data.message, data.errors);
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    if (!userId) return <p className="text-center text-gray-600">Loading user profile...</p>;
    if (loading) return <p className="text-center text-gray-600">Loading favorites...</p>;

    // ✅ Filter favorites based on selected type
    const filteredFavorites = favorites.filter((fav) => {
        if (filterType === "all") return true;
        return fav.favoritable_type.toLowerCase().includes(filterType);
    });

    return (
        <>
            <Navbar />

            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Favorites</h1>

                {/* ✅ Filter Buttons */}
                <div className="mb-4 flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => setFilterType("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filterType === "property" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => setFilterType("property")}
                    >
                        Properties
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filterType === "service" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => setFilterType("service")}
                    >
                        Services
                    </button>
                </div>

                {/* ✅ Render Filtered Favorites */}
                {filteredFavorites.length === 0 ? (
                    <p className="text-gray-500">No favorites found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredFavorites.map((fav) => {
                            const favoritable = fav?.favoritable || {}; // Ensure favoritable exists
                            return (
                                <div key={fav.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="relative w-full h-40">
                                        <Image
                                            src={favoritable.image || "/user.jpg"}
                                            alt={favoritable.title_en || "Favorite Item"}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-t-lg"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{favoritable.title_en || "No title available"}</h3>
                                        <p className="text-gray-600">
                                            {favoritable.location_en || favoritable.location_ar || "Location not provided"}
                                        </p>
                                        <p className="text-primary font-semibold">
                                            {favoritable.price ? `${favoritable.price} ${favoritable.price_unit_en || ""}` : "Price not available"}
                                        </p>
                                        <button
                                            onClick={() => removeFavorite(fav.favoritable_id, fav.favoritable_type)}
                                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </>

    );
}
