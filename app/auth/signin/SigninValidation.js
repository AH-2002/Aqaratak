"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setUserToken } from './serverToken';

export default function SigninValidation() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    let router = useRouter();
    let [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    let [errors, setErrors] = useState({});
    useEffect(() => {
        startTokenRefresh(); // Start auto refresh when component mounts
    }, []);

    let handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        console.log(formData)
    }
    let handleSubmit = async (e) => {
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

        if (Object.keys(validationError).length !== 0) return; // Ensure errors are checked after setting

        try {
            const response = await fetch(`${api_URL}api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            console.log("login data", response);
            const responseData = await response.json();
            console.log("json login data", responseData);
            if (response.status === 200) {
                const token = responseData.data;
                localStorage.setItem("userToken", token);
                startTokenRefresh();
                await fetch("/api/auth/set-cookie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });                router.push("/site/home");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({ general: "Something went wrong. Please try again." });
        }
    };


    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${api_URL}api/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                const newAccessToken = responseData.access_token;
                console.log("new access token", newAccessToken);
                localStorage.setItem("userToken", newAccessToken);
                await setUserToken(newAccessToken);
            } else {
                console.error("Failed to refresh token");
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    const startTokenRefresh = () => {
        setInterval(() => {
            refreshAccessToken();
        }, 55 * 60 * 1000); // Refresh token every 55 minutes
    };


    return (
        <div
            className="rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark"
            style={{ background: 'transparent', width: '65%', margin: 'auto' }}>
            <form className='signup-form' onSubmit={handleSubmit}>
                {errors.general && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {errors.general}
                    </div>
                )}


                <div className="relative mb-6" data-twe-input-wrapper-init>
                    <label htmlFor="email" className="block text-gray-700 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                        id="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

                </div>

                <div className="relative mb-6" data-twe-input-wrapper-init>
                    <label htmlFor="password" className="block text-gray-700 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                        id="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}

                    />

                    {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}

                </div>


                <button
                    type="submit"
                    className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    style={{ background: 'linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))', color: 'white', padding: '20px', borderRadius: '30px' }}>
                    Continue <span style={{ marginLeft: '10px' }}><i class="fa fa-arrow-right"></i></span>
                </button>
            </form>
        </div>
    )
}
