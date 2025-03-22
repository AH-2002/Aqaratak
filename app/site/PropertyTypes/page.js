"use client";
import { useState, useEffect } from "react";
import { useProfile } from "@/app/context/profileContext";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddCategoryButton from "../PropertiesCategories/AddCategoryButtond";
import DeleteCategoryButton from "../PropertiesCategories/DeleteCategoryButton";
import UpdateCategoryButton from "../PropertiesCategories/UpdateCategoryButton";

export default function PropertyTypes() {
    const { profile } = useProfile();
    const [Prop_Types, setProp_Types] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${api_URL}api/types/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch property types");

                const ParsedResponse = await response.json();
                console.log("Parsed response categories:", ParsedResponse);

                setProp_Types(ParsedResponse?.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyTypes();
    }, [token]);

    const isTenant = profile?.data?.role === "tenant";

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-center text-xl font-bold mb-4">Property Types</h2>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Property Types List</span>
                    {!isTenant && <AddCategoryButton type="types" />}
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading property types...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        {/* Column Titles */}
                        <div className="flex justify-between font-bold text-lg bg-gray-200 p-2 rounded">
                            <span className="w-1/4 text-center">ID</span>
                            <span className="w-2/4 text-center">Property Types</span>
                            {!isTenant && <span className="w-1/4 text-center"></span>}
                        </div>

                        <ul className="space-y-2 mt-2">
                            {Prop_Types.length > 0 ? (
                                Prop_Types.map((category) => (
                                    <li
                                        key={category.id}
                                        className="p-2 border rounded flex justify-between items-center"
                                    >
                                        <span className="w-1/4 text-center font-medium text-gray-600">
                                            {category.id}
                                        </span>
                                        <span className="w-2/4 text-center font-semibold">{category.name}</span>
                                        {!isTenant && (
                                            <div className="w-1/4 flex gap-2">
                                                <UpdateCategoryButton type="types" category={category} />
                                                <DeleteCategoryButton type="types" categoryId={category.id} />
                                            </div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p className="text-center">No property types available</p>
                            )}
                        </ul>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}
