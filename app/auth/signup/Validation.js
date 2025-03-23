"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const router = useRouter();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.first_name.trim()) errors.first_name = "First Name is required";
        if (!formData.last_name.trim()) errors.last_name = "Last Name is required";
        if (!formData.email.includes("@")) errors.email = "Valid Email is required";
        if (!formData.phone.match(/^\d{10,15}$/)) errors.phone = "Enter a valid phone number";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch(`${api_URL}api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    password_confirmation:formData.confirmPassword
                }),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert("Registration Successful!");
                router.push("/auth/signin");
            } else {
                setErrors({ general: data.message || "Registration failed. Try again." });
            }
        } catch (error) {
            setErrors({ general: "Validation error. Please try again later." });
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>

                {errors.general && <div className="bg-red-500 text-white p-3 rounded mb-4">{errors.general}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                            />
                            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                            />
                            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-lg shadow-lg hover:opacity-90 transition-all"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
}
