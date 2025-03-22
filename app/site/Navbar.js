"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useProfile } from "../context/profileContext";

export default function Navbar() {
    const { profile } = useProfile();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("userToken"));
        }
    }, []);
    const router = useRouter();
    console.log("profile", profile)
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        router.push("/auth/signin");
    };

    // Close user menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-transparent px-2 text-center">
            <div className="flex justify-between items-center h-16">
                {/* Logo Section */}
                <div className="flex items-center">
                    <div className="mr-8">
                        <Image src="/logo.png" alt="Logo" width={50} height={50} />
                    </div>

                    {/* Navigation Links (Hidden on Mobile) */}
                    <div className="hidden md:flex space-x-10">
                        <Link href="/site/home"><button>Home</button></Link>
                        <Link href="/site/RentPage"><button>Rent</button></Link>
                        {token ? (
                            <>
                                <Link href="/site/servicePage"><button>Services</button></Link>
                                <Link href="/site/favoritePage"><button>Favourite</button></Link>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* User Account Section (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    {profile ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                            >
                                <i className="fa-solid fa-user text-gray-700 text-lg"></i>
                            </button>

                            {/* Dropdown Menu */}
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50">
                                    <Link href="/site/AdminProfile">
                                        <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">My Profile</button>
                                    </Link>
                                    <Link href="/site/PropertiesCategories">
                                        <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Categories of Properties</button>
                                    </Link>
                                    <Link href="/site/ServicesCategories">
                                        <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Categories of Services</button>
                                    </Link>
                                    <Link href="/site/PropertyTypes">
                                        <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Types of Properties</button>
                                    </Link>
                                    {profile.data.role === "admin" && (
                                        <>
                                            <Link href="/site/GetAllUsers">
                                                <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Get Users</button>
                                            </Link>
                                            <Link href="/site/Visits">
                                                <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Schedule a Visit</button>
                                            </Link>
                                            <Link href="/site/Emergency">
                                                <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Set an Emergency</button>
                                            </Link>
                                        </>
                                    )}
                                    <button onClick={handleLogout} className="block px-4 py-2 text-left w-full text-red-500 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/signin">
                                <button className="text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 hover:text-white">Sign In</button>
                            </Link>
                            <Link href="/auth/register">
                                <button className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 focus:outline-none">
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col space-y-4 px-4 py-2 bg-white shadow-md rounded-md">
                    <Link href="/site/home"><button>Home</button></Link>
                    <Link href="/site/RentPage"><button>Rent</button></Link>
                    <Link href="/site/servicePage"><button>Services</button></Link>
                    <Link href="/site/favoritePage"><button>Favourite</button></Link>
                    {profile ? (
                        <>
                            <Link href="/site/AdminProfile"><button>My Profile</button></Link>
                            <Link href="/site/PropertiesCategories"><button>Categories of Properties</button></Link>
                            <Link href="/site/ServicesCategories"><button>Categories of Services</button></Link>

                            {profile.data.role === "admin" && (
                                <>
                                    <Link href="/site/GetAllUsers"><button>Get Users</button></Link>
                                    <Link href="/site/Visits"><button>Schedule a Visit</button></Link>
                                    <Link href="/site/Emergency"><button>Set an Emergency</button></Link>
                                    <Link href="/site/PropertyTypes"><button>Types of Properties</button></Link>
                                </>
                            )}
                            <button onClick={handleLogout} className="text-red-500 hover:bg-gray-100">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/signin"><button>Sign In</button></Link>
                            <Link href="/auth/register"><button className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign Up</button></Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
