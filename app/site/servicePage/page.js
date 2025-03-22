"use client";
import ServiceCard from "../Cards/serviceCard";
import ServiceForm from "./ServiceForm";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useEffect, useState } from "react";

export default function ServicePage() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    
    const [token, setToken] = useState(null);
    const [services, setServices] = useState([]);
    const [error, setErrors] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // New state to trigger refresh

    useEffect(() => {
        setToken(localStorage.getItem("userToken"));
    }, []);

    useEffect(() => {
        if (!token) return; // Wait until token is set

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
                setServices(parsedResponse?.data || []);
            } catch (err) {
                console.error("Error fetching services:", err);
                setErrors(err.message);
            }
        };
        fetchData();
    }, [token, refreshTrigger]); // Refresh when refreshTrigger changes

    // Function to manually trigger a refresh
    const refreshServices = () => {
        setRefreshTrigger(prev => prev + 1); // Increment trigger state to cause re-fetch
    };

    return (
        <>
            <Navbar />
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Explore Our Apartments for Service</h1>
                    <ServiceForm onSuccess={refreshServices} /> {/* Trigger refresh after adding */}
                </div>

                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {services.map((item) => (
                            <ServiceCard key={item.id} service={item} refreshServices={refreshServices} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No services available.</p>
                )}
            </section>
            <Footer />
        </>
    );
}
