"use client";

import { useEffect, useState } from "react";

export default function AddPropertyButton({ refreshProperties }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem("userToken");

            if (storedToken) {
                setToken(storedToken);
            } else {
                throw new Error("Token not found in localStorage");
            }
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const [formData, setFormData] = useState({
        title_en: "",
        title_ar: "",
        price: "",
        price_unit_en: "USD",
        price_unit_ar: "USD",
        unit_number: "",
        rent_amount: "",
        lease_start: "",
        lease_end: "",
        status: "occupied",
        rooms: "",
        beds: "",
        bathrooms: "",
        land_space: "",
        is_furnished: false,
        features_en: "",
        features_ar: "",
        amenities_en: "",
        amenities_ar: "",
        description_en: "",
        description_ar: "",
        location_en: "",
        location_ar: "",
        coordinates_location: "",
        phone: "",
        images: [],
        user_id: "",
        category_id: "",
        type_id: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;

        setFormData((prevData) => ({
            ...prevData,
            images: selectedFiles,
        }));
    };

    const formatJsonField = (text) => {
        if (!text.trim()) return "{}";
        try {
            return JSON.stringify(JSON.parse(text));
        } catch {
            return JSON.stringify({ value: text });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.images.length === 0) {
            setError("At least one image is required.");
            setLoading(false);
            return;
        }

        const api_URL = "https://realestate.learnock.com/";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title_en", formData.title_en);
            formDataToSend.append("title_ar", formData.title_ar);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("price_unit_en", formData.price_unit_en);
            formDataToSend.append("price_unit_ar", formData.price_unit_ar);
            formDataToSend.append("unit_number", formData.unit_number);
            formDataToSend.append("rent_amount", formData.rent_amount);
            formDataToSend.append("lease_start", formData.lease_start);
            formDataToSend.append("lease_end", formData.lease_end);
            formDataToSend.append("status", formData.status);
            formDataToSend.append("rooms", formData.rooms);
            formDataToSend.append("beds", formData.beds);
            formDataToSend.append("bathrooms", formData.bathrooms);
            formDataToSend.append("land_space", formData.land_space);
            formDataToSend.append("is_furnished", formData.is_furnished ? "1" : "0");
            formDataToSend.append("features_en", formatJsonField(formData.features_en));
            formDataToSend.append("features_ar", formatJsonField(formData.features_ar));
            formDataToSend.append("amenities_en", formatJsonField(formData.amenities_en));
            formDataToSend.append("amenities_ar", formatJsonField(formData.amenities_ar));
            formDataToSend.append("description_en", formData.description_en);
            formDataToSend.append("description_ar", formData.description_ar);
            formDataToSend.append("location_en", formData.location_en);
            formDataToSend.append("location_ar", formData.location_ar);
            formDataToSend.append("coordinates_location", formData.coordinates_location);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("user_id", formData.user_id);
            formDataToSend.append("category_id", formData.category_id);
            formDataToSend.append("type_id", formData.type_id);

            formData.images.forEach((image, index) => {
                formDataToSend.append(`images[${index}]`, image);
            });

            console.log("Final FormData Before Sending:", formDataToSend);

            const response = await fetch(`${api_URL}api/properties`, {
                method: "POST",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            const responseData = await response.json();
            console.log("API Response:", responseData);

            if (!response.ok) throw new Error(responseData.message || "Failed to add property");

            await refreshProperties();
            setShowForm(false);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (key) => {
        switch (key) {
            case "price":
            case "rent_amount":
            case "rooms":
            case "beds":
            case "bathrooms":
            case "land_space":
                return (
                    <input
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                );
            case "lease_start":
            case "lease_end":
                return (
                    <input
                        type="date"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                );
            case "is_furnished":
                return (
                    <input
                        type="checkbox"
                        name={key}
                        checked={formData.is_furnished}
                        onChange={handleChange}
                        className="ml-2"
                    />
                );
            case "images":
                return (
                    <input
                        type="file"
                        name={key}
                        multiple
                        onChange={handleImageChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                );
        }
    };

    return (
        <div className="mb-6 z-10">
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Add Property
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Add New Property</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 p-2">
                            {Object.keys(formData).map((key) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {key.replace(/_/g, " ")}
                                    </label>
                                    {renderInput(key)}
                                </div>
                            ))}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                            >
                                {loading ? "Adding..." : "Submit"}
                            </button>
                        </form>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <button onClick={() => setShowForm(false)} className="mt-4 text-gray-600">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
