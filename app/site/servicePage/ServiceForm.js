"use client";

import { useProfile } from "@/app/context/profileContext";
import { useState } from "react";

export default function ServiceForm({ onSuccess, existingService = null }) {
    const [token, setToken] = useState(null);
    const {profile} = useProfile();
    const isTenant = profile?.data?.role === "tenant";
    const apiKey = 1234;
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title_en: existingService?.title_en || "",
        title_ar: existingService?.title_ar || "",
        price: existingService?.price || "",
        price_duration: existingService?.price_duration || "per_hour",
        price_unit_en: existingService?.price_unit_en || "USD",
        price_unit_ar: existingService?.price_unit_ar || "USD",
        description_en: existingService?.description_en || "",
        description_ar: existingService?.description_ar || "",
        location_en: existingService?.location_en || "",
        location_ar: existingService?.location_ar || "",
        phone: existingService?.phone || "",
        image: null,
        user_id: existingService?.user_id || "",
        category_id: existingService?.category_id || "",
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("userToken");
            if (storedToken) setToken(storedToken);
        }
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api_URL = existingService
            ? `https://realestate.learnock.com/api/services/${existingService.id}`
            : "https://realestate.learnock.com/api/services";

        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
        });

        try {
            const response = await fetch(api_URL, {
                method: existingService ? "PUT" : "POST",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: formDataObj,
            });
            const data = await response.json();
            console.log(existingService ? "Update Response:" : "Create Response:", data);

            if (!response.ok) throw new Error(data.message || "Failed to process request");

            onSuccess();
            setIsOpen(false); // Close form on success
        } catch (err) {
            console.error(existingService ? "Update Error:" : "Create Error:", err);
        }
    };

    return (
        <div className="relative">
            {/* Button to Open Form */}
            {token && !isTenant?
            (<button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`fixed top-1/2 left-4 transform -translate-y-1/2 transition-all duration-300 
                ${isOpen ? "translate-x-[-80px]" : ""} bg-blue-500 text-white px-4 py-2 rounded`}
            >
                {isOpen ? "Close" : "Open Form"}
            </button>):null
}

            {/* Sliding Form */}
            <div 
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 transform transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}
            >
                <h2 className="text-lg font-semibold mb-4">{existingService ? "Update Service" : "Create Service"}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title_en" value={formData.title_en} onChange={handleChange} placeholder="Title (English)" required className="w-full p-2 border rounded" />
                    <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} placeholder="Title (Arabic)" required className="w-full p-2 border rounded" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded" />
                    <select name="price_duration" value={formData.price_duration} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="per_hour">Per Hour</option>
                        <option value="per_day">Per Day</option>
                    </select>
                    <input type="text" name="price_unit_en" value={formData.price_unit_en} onChange={handleChange} placeholder="Price Unit (English)" required className="w-full p-2 border rounded" />
                    <input type="text" name="price_unit_ar" value={formData.price_unit_ar} onChange={handleChange} placeholder="Price Unit (Arabic)" required className="w-full p-2 border rounded" />
                    <textarea name="description_en" value={formData.description_en} onChange={handleChange} placeholder="Description (English)" required className="w-full p-2 border rounded"></textarea>
                    <textarea name="description_ar" value={formData.description_ar} onChange={handleChange} placeholder="Description (Arabic)" required className="w-full p-2 border rounded"></textarea>
                    <input type="text" name="location_en" value={formData.location_en} onChange={handleChange} placeholder="Location (English)" required className="w-full p-2 border rounded" />
                    <input type="text" name="location_ar" value={formData.location_ar} onChange={handleChange} placeholder="Location (Arabic)" required className="w-full p-2 border rounded" />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full p-2 border rounded" />
                    
                    {/* User ID Input */}
                    <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required className="w-full p-2 border rounded" />

                    {/* Category ID Input */}
                    <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required className="w-full p-2 border rounded" />

                    <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

                    <div className="flex justify-between">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{existingService ? "Update Service" : "Create Service"}</button>
                        <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    ); 
} 
