"use server";

import { cookies } from "next/headers";

export async function setUserToken(token) {
    cookies().set("userToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // Expire in 7 days
        path: "/",
    });
}

// New server action for login
export async function loginUser({ email, password }) {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    try {
        const response = await fetch(`${api_URL}api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const responseData = await response.json();
            const token = responseData.data;

            // Store token securely in server-side cookies
            await setUserToken(token);

            return { success: true, token };
        } else {
            return { success: false, error: "Invalid credentials" };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
