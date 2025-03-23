"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import RentCard from "../Cards/RentCard";
export default function Rent() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    const [properties, setProperties] = useState([]);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("userToken"));
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`${api_URL}api/properties`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`,
                    },
                    cache: "no-store",
                });

                if (!response.ok) throw new Error("Failed to fetch properties");

                const parsedResponse = await response.json();
                setProperties(parsedResponse?.data?.slice(0, 3) || []);
            } catch (err) {
                console.error("Error fetching Properties:", err);
                setError(err.message);
            }
        };

        fetchData();
    }, [token]); // Re-run when `token` is set

    return (
        <section className="py-12">
            <h1 className="text-3xl font-bold mb-6">Explore Our Apartments for Rent</h1>

            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : properties.length > 0 ? (
                <div className="purchase grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties.map((item) => (
                        <RentCard key={item.id} property={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No Properties available.</p>
            )}

            <div className="flex justify-center mt-6">
                <Link href="/site/RentPage">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                        See More
                    </button>
                </Link>
            </div>
        </section>
    );
}
