"use client";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Footer from "../../Footer";
import Navbar from "../../Navbar";

export default function PropertyDetails({ params }) {
    const { id } = params;
    const API_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("userToken"));
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchPropertyDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}api/properties/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch property details");

                const jsonResponse = await response.json();
                setProperty(jsonResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [token, id]);

    const parsePropertyData = (data) => {
        try {
            const parsedData = JSON.parse(data);
            return typeof parsedData === "string" ? JSON.parse(parsedData).value : parsedData.value;
        } catch (error) {
            return data; // Return original if parsing fails
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading property details...</p>;
    if (error) return <p className="text-red-500 text-center">Error fetching property details: {error}</p>;
    if (!property) return <p className="text-center">No property details found.</p>;

    const features = property.features ? parsePropertyData(property.features) : "N/A";
    const amenities = property.amenities ? parsePropertyData(property.amenities) : "N/A";

    return (
        <>
            <Navbar />
            <section className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative w-full h-96">
                        <Image
                            src={property.image || "/user.jpg"}
                            alt={property.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 text-lg mb-2"><strong>Description:</strong> {property.description}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Price:</strong> {property.price} {property.price_unit}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Location:</strong> {property.location}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Features:</strong> {features}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Amenities:</strong> {amenities}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Rooms:</strong> {property.rooms}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Beds:</strong> {property.beds}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Bathrooms:</strong> {property.bathrooms}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Land Space:</strong> {property.land_space} M²</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Furnished:</strong> {property.is_furnished ? "Yes" : "No"}</p>
                        <p className="text-gray-700 text-lg mb-2"><strong>Contact:</strong> {property.phone}</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
