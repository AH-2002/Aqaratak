"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getUserToken } from "@/app/userRole/getUserToken";
import Navbar from "@/app/site/Navbar"; // Adjust based on actual path
import Footer from "@/app/site/Footer"; // Adjust based on actual path

export default function ServiceDetails() {
    const { id } = useParams(); // ✅ Get dynamic ID from URL
    const [service, setService] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchService() {
            if (!id) return;
            console.log("Fetching service details for ID:", id);

            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const token = await getUserToken();
            const api_URL = `https://realestate.learnock.com/api/services/${id}`;

            try {
                const response = await fetch(api_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch service details");

                const data = await response.json();
                console.log("API Response:", data);
                setService(data.data); // ✅ Store the service data correctly
            } catch (err) {
                setError(err.message);
            }
        }

        fetchService();
    }, [id]);

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!service) return <p className="text-center text-gray-500 text-lg">Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto py-12 px-6 bg-gray-100 min-h-screen">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="bg-gray-600 text-white px-4 py-2 rounded mb-6 hover:bg-gray-700 transition"
                >
                    ← Back
                </button>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Service Image */}
                    <div className="relative w-full h-72 sm:h-96">
                        <Image
                            src={service.image_url || "/user.jpg"} // Use default image if missing
                            alt={service.title || "Service Image"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                    </div>

                    {/* Service Details */}
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-gray-900">{service.title || "No Title Available"}</h2>
                        <p className="text-gray-600 mt-2">{service.description || "No description provided."}</p>

                        {/* Price & Duration */}
                        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg mt-6">
                            <span className="text-xl font-semibold text-gray-900">
                                {service.price ? `${service.price} ${service.price_unit || ""}` : "Price Not Available"}
                            </span>
                            <span className="text-gray-600">
                                {service.price_duration ? `/${service.price_duration}` : ""}
                            </span>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <p className="text-gray-700 text-lg">
                                🆔 <strong>Service ID:</strong> {service.id || "N/A"}
                            </p>

                            <p className="text-gray-700 text-lg">
                                📍 <strong>Location:</strong> {service.location || "N/A"}
                            </p>
                            <p className="text-gray-700 text-lg">
                                📞 <strong>Phone:</strong> {service.phone || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
