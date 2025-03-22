"use client";
import Image from "next/image";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useProfile } from "@/app/context/profileContext";

export default function AdminProfile() {
    const { profile } = useProfile();

    console.log("Admin Profile:", profile);

    return (
        <>
            <Navbar />

            {/* Main container with flex for full height */}
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100 px-4">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>

                    {profile && (profile.data?.role === "admin"||profile.data?.role === "tenant") ? (
                        <>
                            {/* Profile Image */}
                            <div className="mt-6">
                                <Image
                                    src="/user.jpg"
                                    alt="Profile Picture"
                                    width={120}
                                    height={120}
                                    className="rounded-full mx-auto border border-gray-300"
                                />
                            </div>

                            {/* Name */}
                            <h2 className="text-2xl font-semibold mt-4 text-gray-900">
                                {profile.data.first_name} {profile.data.last_name}
                            </h2>

                            {/* Email & Phone */}
                            <p className="text-gray-600 mt-2">{profile.data.email}</p>
                            <p className="text-gray-600">{profile.data.phone || "No Phone"}</p>

                            {/* User Role */}
                            <p className="text-gray-700 font-medium mt-3 bg-gray-200 px-3 py-1 rounded-md inline-block">
                                Role: {profile.data.role}
                            </p>

                            {/* Account Created & Updated Dates */}
                            <div className="mt-4 text-gray-500 text-sm">
                                <p>Created at: {new Date(profile.data.created_at).toLocaleString()}</p>
                                <p>Last updated: {new Date(profile.data.updated_at).toLocaleString()}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-red-500 mt-6 text-lg">Access Denied</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
