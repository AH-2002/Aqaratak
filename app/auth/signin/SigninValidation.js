"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginAction } from './loginAction';

export default function signinValidation() {
    let router = useRouter();
    let [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    let [errors, setErrors] = useState({});

    let handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        let validationError = {};

        if (!formData.email.trim()) {
            validationError.email = "Email is rquired";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationError.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
            validationError.password = "Password is rquired";
        } else if (formData.password.length < 6) {
            validationError.password = "Password must be at least 6 characters";
        }

        setErrors(validationError);
        if (Object.keys(validationError).length === 0) {
            console.log("Submitting login request..."); // ✅ Debug log 1
            try {
                const result = await loginAction(formData);
                if (result.status === 200) {
                    console.log("Login Action Result:", result); // ✅ Debug log 2

                    router.push("/site/home");
                } else {
                    setErrors({ general: result.message });
                }
            } catch (error) {
                setErrors({ general: "Login failed. Please try again." });
            }
        };
    }
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
                        id="exampleInput125"
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
                        id="exampleInput126"
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