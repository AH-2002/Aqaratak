"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SigninValidation() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
            validationErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length !== 0) return;

        try {
            // Call server action through an API route
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                router.push("/site/home");
            } else {
                setErrors({ general: data.error });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({ general: "Something went wrong. Please try again." });
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
