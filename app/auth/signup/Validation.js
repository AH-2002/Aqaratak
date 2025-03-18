"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Validation() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    let router = useRouter();
    let [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    let [errors, setErrors] = useState({});

    let handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        console.log(formData)
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        let validationError = {};

        if (!formData.first_name.trim()) {
            validationError.first_name = "First name is required";
        }
        if (!formData.last_name.trim()) {
            validationError.last_name = "Last name is rquired";
        }
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
        if (!formData.confirmPassword.trim()) {
            validationError.confirmPassword = "Confirm password is rquired";
        } else if (formData.confirmPassword !== formData.password) {
            validationError.confirmPassword = "Password doesn't match"
        }
        if (!formData.phone.trim()) {
            validationError.phone = "Phone number is required";
        } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
            validationError.phone = "Invalid phone number format";
        }



        setErrors(validationError);
        if (Object.keys(validationError).length !== 0) return;

        console.log("Validation passed, sending OTP requests...");

        try {
            const otpPromiseMail = await fetch(`${api_URL}api/auth/otp_mail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey
                },
                body: JSON.stringify({
                    email: formData.email
                })
            })
            const otpPromisPhone = await fetch(`${api_URL}api/auth/otp_phone`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey
                },
                body: JSON.stringify({
                    phone_number: formData.phone
                })
            })
            const [otpResponseMail, otpResponsePhone] = await Promise.all([otpPromiseMail, otpPromisPhone]);
            const otpMailJson = await otpResponseMail.json();
            const otpPhoneJson = await otpResponsePhone.json();
            console.log("JSON OTP Phone Response:", otpPhoneJson);
            console.log("JSON OTP mail Response:", otpMailJson);
            console.log("OTP Phone Response:", otpResponsePhone);
            console.log("OTP mail Response:", otpResponseMail);


            if (otpMailJson.message === "OTP sent successfully" && otpResponseMail.status === 200 && otpPhoneJson.message.includes("SMS sent successfully") && otpResponsePhone.status === 200) {
                localStorage.setItem("user_data", formData);
                router.push("verification");
            }

            else {
                setErrors({ general: json_registerResponse.message });
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({ general: "Something went wrong. Please try again." });
        }
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
                )}                <div className="flex justify-between mb-6">
                    <div className="relative w-[48%]">
                        <label htmlFor="first_name" className="block text-gray-700 font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                            id="exampleInput123"
                            aria-describedby="emailHelp123"
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        {errors.first_name && <p className='text-red-500 text-sm mt-1'>{errors.first_name}</p>}

                    </div>

                    <div className="relative w-[48%]">
                        <label htmlFor="last_name" className="block text-gray-700 font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                            id="exampleInput123"
                            aria-describedby="emailHelp123"
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p className='text-red-500 text-sm mt-1'>{errors.last_name}</p>}

                    </div>

                </div>


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
                    <label htmlFor="phone_number" className="block text-gray-700 font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        pattern="^\+?\d{10,15}$"
                        className="peer block w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />


                    {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}

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

                <div className="relative mb-6" data-twe-input-wrapper-init>
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                        id="exampleInput127"
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}

                    />

                    {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}

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