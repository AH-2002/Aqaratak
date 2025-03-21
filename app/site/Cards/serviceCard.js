"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getUserToken } from "@/app/userRole/getUserToken";
import FavoriteButton from "../favoritePage/FavoriteButton";
export default function ServiceCard({ service, refreshServices }) {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter(); // Initialize router

    const [formData, setFormData] = useState({
        title_en: service.title,
        description_en: service.description,
        price: service.price,
        price_duration: service.price_duration,
        price_unit_en: service.price_unit,
        location_en: service.location,
        phone: service.phone,
        user_id: 1,
        category_id: 1,
    });

    const apiKey = 1234;

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Navigate to service details when clicking the image
    const handleImageClick = () => {
        router.push(`/site/ServiceDetails/${service.id}`);
    };

    const handleDelete = async () => {
        const token = await getUserToken();
        const api_URL = `https://realestate.learnock.com/api/services/${service.id}`;

        try {
            const response = await fetch(api_URL, {
                method: "DELETE",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });

            let data;
            if (response.headers.get("content-type")?.includes("application/json")) {
                data = await response.json();
            } else {
                data = {};
            }

            console.log("Delete Response:", data);

            if (!response.ok) throw new Error(data.message || "Failed to delete service");

            refreshServices();
        } catch (err) {
            console.error("Delete Error:", err);
        }
    };

    const handleUpdate = async () => {
        const token = await getUserToken();
        const api_URL = `https://realestate.learnock.com/api/services/${service.id}`;

        try {
            const response = await fetch(api_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Update Response:", data);

            if (!response.ok) throw new Error(data.message || "Failed to update service");

            refreshServices();
            setIsEditing(false);
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Clickable Image */}
            <div className="relative w-full h-56 cursor-pointer" onClick={handleImageClick}>
                <Image
                    src="/user.jpg"
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                    priority
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="text-md font-medium text-primary">
                    {service.price} {service.price_unit}{" "}
                    <span className="text-sm text-gray-500">/ {service.price_duration}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>

                <div className="flex justify-between mt-4">
                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                    </button>
                </div>
                <div className="mt-2">
                    <FavoriteButton favoritableId={service.id} favoritableType="service" />
                </div>
            </div>

            {/* Update Form (Modal) */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-auto">
                        <h2 className="text-lg font-semibold mb-4">Update Service</h2>

                        <input
                            type="text"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full p-2 border mb-2"
                        />

                        <textarea
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-2 border mb-2"
                        ></textarea>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full p-2 border mb-2"
                        />

                        <input
                            type="text"
                            name="price_duration"
                            value={formData.price_duration}
                            onChange={handleChange}
                            placeholder="Price Duration"
                            className="w-full p-2 border mb-2"
                        />

                        <input
                            type="text"
                            name="price_unit_en"
                            value={formData.price_unit_en}
                            onChange={handleChange}
                            placeholder="Currency"
                            className="w-full p-2 border mb-2"
                        />

                        <input
                            type="text"
                            name="location_en"
                            value={formData.location_en}
                            onChange={handleChange}
                            placeholder="Location"
                            className="w-full p-2 border mb-2"
                        />

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full p-2 border mb-2"
                        />

                        <input
                            type="number"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            placeholder="Category ID"
                            className="w-full p-2 border mb-2"
                        />

                        <input
                            type="file"
                            name="image"
                            onChange={(e) => console.log("Handle image upload here")}
                            className="w-full p-2 border mb-2"
                        />

                        <div className="flex justify-between mt-4">
                            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
