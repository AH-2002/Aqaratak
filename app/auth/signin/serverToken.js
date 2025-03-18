"use server";
import { cookies } from "next/headers";

export async function setUserToken(token) {
    cookies().set("userToken", token, {
        httpOnly: true, // Secure server-only access
        secure: process.env.NODE_ENV === "production", // Enforce security in production
        maxAge: 7 * 24 * 60 * 60, // Expire in 7 days
        path: "/", // Accessible everywhere in the app
    });
}
