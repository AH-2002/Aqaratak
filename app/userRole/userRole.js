import { getUserToken } from "./getUserToken";

export default async function UserRole() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

    // Await the token retrieval properly
    const token = await getUserToken();

    if (!token) return null; // Return null if no token is found

    try {
        const response = await fetch(`${api_URL}api/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const user = await response.json();
        return user; 
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}
