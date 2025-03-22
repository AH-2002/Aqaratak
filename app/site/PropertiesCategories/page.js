"use client";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddCategoryButton from "./AddCategoryButtond";
import DeleteCategoryButton from "./DeleteCategoryButton";
import UpdateCategoryButton from "./UpdateCategoryButton";
import { useProfile } from "@/app/context/profileContext";

export default function PropertiesCategories() {
    const { profile } = useProfile();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;

   
    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("userToken"));
        }
    }, []);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${api_URL}api/properties/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch categories");

                const parsedResponse = await response.json();
                setCategories(parsedResponse?.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [token]);

    const refreshCategories = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const response = await fetch(`${api_URL}api/properties/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch categories");

            const parsedResponse = await response.json();
            setCategories(parsedResponse?.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isTenant = profile?.data?.role === "tenant";


    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-center text-xl font-bold mb-4">Properties Categories</h2>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Properties Categories List</span>
                    {!isTenant && <AddCategoryButton type="properties"/>}
                </div>

                {/* Handle Loading and Error States */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading categories...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="flex justify-between font-bold text-lg bg-gray-200 p-2 rounded">
                            <span className="w-1/4 text-center">ID</span>
                            <span className="w-2/4 text-center">Category Name</span>
                            {!isTenant && <span className="w-1/4 text-center"></span>}
                        </div>

                        <ul className="space-y-2 mt-2">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="p-2 border rounded flex justify-between items-center"
                                    >
                                        <span className="w-1/4 text-center font-medium text-gray-600">{category.id}</span>
                                        <span className="w-2/4 text-center font-semibold">{category.name}</span>
                                        {!isTenant && (
                                            <div className="w-1/4 flex gap-2">
                                                <UpdateCategoryButton type="properties" category={category} />
                                                <DeleteCategoryButton type="properties" categoryId={category.id} />
                                            </div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p className="text-center">No categories available</p>
                            )}
                        </ul>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}
