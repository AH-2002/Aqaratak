"use client";

import { useState } from "react";

export default function RefreshTokenButton() {
    const [expiresIn, setExpiresIn] = useState(null);
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const token = localStorage.getItem("userToken");
    const handleRefreshToken = async () => {
        try {
            const response = await fetch(`${api_URL}api/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`
                },
                cache: "no-store",
            });

            if (!response.ok) throw new Error("Failed to refresh token");

            const data = await response.json();
            console.log("refresh 1", response);
            console.log("refresh 2", data);
            console.log("token", token);
            setExpiresIn(data.expires_in); // Update expiration time
            console.log("New Token:", data.access_token); // Store or use the new token
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    return (
        <div className="mt-4 flex items-center gap-4">
            <button
                onClick={handleRefreshToken}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Refresh Token
            </button>
            {expiresIn !== null && (
                <p className="text-gray-600">Expires in: {expiresIn / 60} minutes</p>
            )}
        </div>
    );
}
