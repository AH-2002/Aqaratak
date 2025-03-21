"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api_URL}api/user/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch profile");

            const data = await response.json();
            console.log("profile data",data);
            setProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
    }, [token]);

    return (
        <ProfileContext.Provider value={{ profile, loading, error, refreshProfile: fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
