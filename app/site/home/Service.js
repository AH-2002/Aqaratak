"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import ServiceCard from "../Cards/serviceCard";
export default function Service() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const token = localStorage.getItem("userToken");

    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_URL}api/services`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`,
                    },
                    cache: "no-store",
                });

                if (!response.ok) throw new Error("Failed to fetch services");

                const parsedResponse = await response.json();
                setServices(parsedResponse?.data.slice(0, 3) || []);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError(err.message);
            }
        };
        fetchData();
    },[])


    return (
        <section className="py-12">
            <h1 className="text-3xl font-bold mb-6">Explore Our Apartments for Service</h1>

            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : services.length > 0 ? (
                <div className="purchase grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((item) => (
                        <ServiceCard key={item.id} service={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No services available.</p>
            )}

            <div className="flex justify-center mt-6">
                <Link href="/site/servicePage">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                        See More
                    </button>
                </Link>
            </div>
        </section>
    );
}
