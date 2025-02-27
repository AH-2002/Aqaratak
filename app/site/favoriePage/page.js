"use client";
import { useState, useEffect } from "react";
import rentCard from "../Cards/rentCard";

export default function FavoritePage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <section style={{ padding: '50px 0' }}>
            <h1 style={{ fontWeight: 'bolder', fontSize: 'larger', marginBottom: '25px' }}>
                Your Favorite Properties
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.length > 0 ? (
                    favorites.map((item) => (
                        <rentCard key={item.id} service={item} />
                    ))
                ) : (
                    <p>No favorites added yet.</p>
                )}
            </div>
        </section>
    );
}
