"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import RentCard from "@/app/site/Cards/RentCard";

export default function Rent() {
    const API_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    const [rentList, setRentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${API_URL}api/properties`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "apiKey": apiKey
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch properties");

                const jsonResponse = await response.json();
                console.log("json rent data", jsonResponse);
                setRentList(jsonResponse.data.slice(0, 3)); // Store only the first 3 properties
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <section style={{ padding: "50px 0" }}>
            <h1 style={{ fontWeight: "bolder", fontSize: "larger", marginBottom: "25px" }}>
                Explore our Apartments for Rent
            </h1>

            {loading ? (
                <p>Loading properties...</p>
            ) : error ? (
                <p className="text-red-500">Error fetching properties: {error}</p>
            ) : (
                <div className="purchase grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rentList.length > 0 ? (
                        rentList.map((item) => <ServiceCard key={item.id} service={item} />
                        )
                    ) : (
                        <p>No properties available.</p>
                    )}
                </div>
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
