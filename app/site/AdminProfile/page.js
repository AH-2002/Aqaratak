"use client";
import Image from "next/image";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useProfile } from "@/app/context/profileContext";
import { useEffect, useState } from "react";

export default function AdminProfile() {
  const { profile } = useProfile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p className="text-center mt-6 text-lg text-gray-700">Loading profile...</p>; // Better UX
  }

  if (!profile || !profile.data) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100 px-4">
          <p className="text-red-500 text-lg font-semibold mt-6">No profile data available</p>
        </div>
        <Footer />
      </>
    );
  }

  console.log("Admin Profile:", profile);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100 px-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>

          {(profile.data?.role === "admin" || profile.data?.role === "tenant") ? (
            <>
              <div className="mt-6">
                <Image
                  src="/user.jpg"
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto border border-gray-300"
                />
              </div>
              <h2 className="text-2xl font-semibold mt-4 text-gray-900">
                {profile.data?.first_name || "N/A"} {profile.data?.last_name || ""}
              </h2>
              <p className="text-gray-600 mt-2">{profile.data?.email || "No Email"}</p>
              <p className="text-gray-600">{profile.data?.phone || "No Phone"}</p>
              <p className="text-gray-700 font-medium mt-3 bg-gray-200 px-3 py-1 rounded-md inline-block">
                Role: {profile.data?.role}
              </p>
              <div className="mt-4 text-gray-500 text-sm">
                <p>Created at: {profile.data?.created_at ? new Date(profile.data.created_at).toLocaleString() : "N/A"}</p>
                <p>Last updated: {profile.data?.updated_at ? new Date(profile.data.updated_at).toLocaleString() : "N/A"}</p>
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
