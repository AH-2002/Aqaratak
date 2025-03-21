"use client";

import { useEffect, useState } from "react";

export default function AddUserForm({ onClose, onUserAdded }) {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const [token, setToken] = useState("");

    // Default image from public folder
    const defaultImage = "/user.jpg";
    const [imageFile, setImageFile] = useState(null); // Store the actual file
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "admin",
        password: "",
        password_confirmation: "",
        image: defaultImage, // Initially set to default
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        setToken(storedToken);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Store the actual file
            setFormData({ ...formData, image: URL.createObjectURL(file) }); // Show preview
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await fetch(`${api_URL}api/user/update-image`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "apiKey": apiKey,
                },
                body: formData, // Send as FormData
            });

            const data = await response.json();
            if (response.ok) {
                return data.data.image; // Return the uploaded image URL
            } else {
                alert("Image upload failed!");
                return null;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image!");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload image first if available
        const uploadedImageUrl = await uploadImage();

        const userData = {
            ...formData,
            image: uploadedImageUrl || formData.image, // Use uploaded URL if available
        };

        const response = await fetch(`${api_URL}api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData),
        });
        const parsedResponse = await response.json();
        console.log("User creation response:", parsedResponse);


        if (!response.ok) {
            alert("Failed to create user");
            return;
        }

        alert("User created successfully!");
        localStorage.setItem("userImage",parsedResponse.data.image)
        console.log(localStorage.getItem("userImage"));
        onUserAdded();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create New User</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                        readOnly
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {/* Upload Image Input */}
                    <label className="block">
                        <span className="text-gray-700">Profile Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                    </label>

                    {/* Image Preview */}
                    <div className="mt-2">
                        <img src={formData.image} alt="Preview" className="w-20 h-20 rounded-full border" />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
