"use client";

import { useState, useEffect } from "react";

export default function UpdatePropertyButton({ property, refreshProperties }) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("userToken");

    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            title_en: property?.title_en || "",
            title_ar: property?.title_ar || "",
            price: property?.price || "",
            price_unit_en: property?.price_unit_en || "USD",
            price_unit_ar: property?.price_unit_ar || "USD",
            unit_number: property?.unit_number || "",
            rent_amount: property?.rent_amount || "",
            lease_start: property?.lease_start || "",
            lease_end: property?.lease_end || "",
            status: property?.status || "vacant",
            rooms: property?.rooms || "",
            beds: property?.beds || "",
            bathrooms: property?.bathrooms || "",
            land_space: property?.land_space || "",
            is_furnished: property?.is_furnished || false,
            features_en: property?.features_en || "",
            features_ar: property?.features_ar || "",
            amenities_en: property?.amenities_en || "",
            amenities_ar: property?.amenities_ar || "",
            description_en: property?.description_en || "",
            description_ar: property?.description_ar || "",
            location_en: property?.location_en || "",
            location_ar: property?.location_ar || "",
            coordinates_location: property?.coordinates_location || "",
            phone: property?.phone || "",
            image: null, // Image file will be handled separately
            user_id: property?.user_id || 1,
            category_id: property?.category_id || 1,
            type_id: property?.type_id || 1,
        });
    }, [property]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const api_URL = "https://realestate.learnock.com/";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null && formData[key] !== "") {
                    formDataToSend.append(key, formData[key]);
                }
            });

            console.log("🔹 Sending data:", Object.fromEntries(formDataToSend));

            const response = await fetch(`${api_URL}api/properties/${property.id}`, {
                method: "PUT", // Using PATCH instead of PUT
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            const result = await response.json();
            console.log("🔹 API Response:", result);

            if (!response.ok) throw new Error(result.message || "Failed to update property");

            await refreshProperties();
            setShowForm(false);
        } catch (err) {
            console.error("🔴 Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                Update
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <h2 className="text-xl font-bold mb-4 text-center">Update Property</h2>

                        {/* ✅ Scrollable Form */}
                        <div className="max-h-[80vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                            <input type="text" name="title_en" value={formData.title_en} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Title (English)" required />
                            <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Title (Arabic)" required />
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Price" required />
                            <input type="text" name="price_unit_en" value={formData.price_unit_en} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Price Unit (EN)" required />
                            <input type="text" name="price_unit_ar" value={formData.price_unit_ar} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Price Unit (AR)" required />
                            <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Rooms" />
                            <label className="flex items-center">
                                <input type="checkbox" name="is_furnished" checked={formData.is_furnished} onChange={handleChange} className="mr-2" />
                                Furnished
                            </label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded w-full mb-2" placeholder="Phone" />
                            <input type="file" name="image" onChange={handleChange} className="p-2 border rounded w-full mb-2" />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 mr-2">Cancel</button>
                            <button onClick={handleSubmit} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600" disabled={loading}>
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
