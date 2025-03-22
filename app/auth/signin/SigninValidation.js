"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function SigninValidation() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const intervalRef = useRef(null); // Store interval ID

    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationError = {};

        if (!formData.email.trim()) {
            validationError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationError.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
            validationError.password = "Password is required";
        } else if (formData.password.length < 6) {
            validationError.password = "Password must be at least 6 characters";
        }

        setErrors(validationError);
        if (Object.keys(validationError).length !== 0) return;

        try {
            const response = await fetch(`${api_URL}api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem("userToken", responseData.data);
                router.push("/site/home");
            } else {
                setErrors({ general: responseData.message || "Login failed." });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({ general: "Something went wrong. Please try again." });
        }
    };


    return (
        <div className="rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark"
            style={{ background: "transparent", width: "65%", margin: "auto" }}>
            <form className="signup-form" onSubmit={handleSubmit}>
                {errors.general && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {errors.general}
                    </div>
                )}

                <div className="relative mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] outline-none dark:text-white"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="relative mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                    <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] outline-none dark:text-white"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-primary-accent-300"
                    style={{
                        background: "linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))",
                        color: "white",
                        padding: "20px",
                        borderRadius: "30px",
                    }}>
                    Continue <span style={{ marginLeft: "10px" }}><i className="fa fa-arrow-right"></i></span>
                </button>
            </form>
        </div>
    );
}
