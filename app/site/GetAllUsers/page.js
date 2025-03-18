"use client";
import { useState, useEffect } from "react";
import UserCard from "../Cards/UserCard";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddUserForm from "./AddUserForm";

export default function GetAllUsers() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        setToken(storedToken);

    }, []);
    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    const fetchUsers = async () => {
        const response = await fetch(`${api_URL}api/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store",
        });
        console.log("get all users", response)
        if (response.ok) {
            const { data } = await response.json();
            setUsers(data);
        }
    };

    const handleUserAdded = async () => {
        setIsOpen(false);
        await fetchUsers(); // Refresh the users list
    };

    return (
        <>
            <Navbar />

            <div className="p-10">
                <h1 className="text-2xl font-bold text-center mb-6">Users List</h1>

                {/* Add User Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        + Add User
                    </button>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <UserCard key={user.id} profile={user} />
                    ))}
                </div>

                {/* Add User Form (Modal) */}
                {isOpen && <AddUserForm onClose={() => setIsOpen(false)} onUserAdded={handleUserAdded} />}
            </div>
            <Footer />
        </>
    );
}
