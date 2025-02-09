"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-transparent px-2 text-center">
            <div className="flex justify-between items-center h-16">
                <div className='flex justify-start'>
                    <div className="flex items-center">
                        <div className="mr-8">
                            <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        </div>
                    </div>

                    <div className="hidden md:flex justify-center items-center space-x-10">
                        <Link href="/site/Home"><button>Home</button></Link>
                        <Link href="/site/RentPage"><button>Rent</button></Link>
                        <Link href="/site/services"><button>Services</button></Link>
                        <Link href="/site/favourite"><button>Favourite</button></Link>
                    </div>
                </div>

                {/* Desktop Sign In / Sign Up */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/auth/signin">
                        <button className="text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 hover:text-white">Sign In</button>
                    </Link>
                    <Link href="/auth/register">
                        <button className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign Up</button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-gray-800 focus:outline-none"
                    >
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

            {/* Mobile Menu */}
            {
                menuOpen && (
                    <div className="md:hidden flex flex-col space-y-4 px-4 py-2 bg-white shadow-md rounded-md">
                        <Link href="/site/home"><button>Home</button></Link>
                        <Link href="/site/rent"><button>Rent</button></Link>
                        <Link href="/site/services"><button>Services</button></Link>
                        <Link href="/site/favourite"><button>Favourite</button></Link>
                        <button className="text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md text-sm font-medium">Sign In</button>
                        <button className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign Up</button>
                    </div>
                )
            }
        </nav >
    )
}