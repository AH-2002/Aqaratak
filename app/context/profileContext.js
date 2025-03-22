"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const hasFetched = useRef(false);

    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    // Load token from localStorage only on the client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("userToken");
            if (storedToken) {
                setToken(storedToken);
            } else {
                setLoading(false); // No token, stop loading
            }
        }
    }, []);

    // Fetch user profile
    useEffect(() => {
        if (!token) return;

        hasFetched.current = false; // Reset fetch blocker when token updates

        const fetchProfile = async () => {
            if (hasFetched.current) return; // Skip redundant fetch

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
                setProfile(data);
                hasFetched.current = true;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, loading, error }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
