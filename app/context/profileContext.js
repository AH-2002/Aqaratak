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

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("userToken"));
        }
    }, []);

    useEffect(() => {
        if (!token || hasFetched.current) {
            setLoading(false);
            return;
        }

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
                setProfile(data);
                hasFetched.current = true; // Prevent unnecessary re-fetching
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
