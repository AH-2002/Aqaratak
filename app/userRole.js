"use client";
import { useState, useEffect } from "react";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

export default function userRole() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = cookies().get("userToken")?.value;
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid Token:", error);
            }
        }
    }, []);

    return user;
}
