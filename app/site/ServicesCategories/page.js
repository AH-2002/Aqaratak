"use client"
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddCategoryButton from "../PropertiesCategories/AddCategoryButtond";
import DeleteCategoryButton from "../PropertiesCategories/DeleteCategoryButton";
import UpdateCategoryButton from "../PropertiesCategories/UpdateCategoryButton";
import { useProfile } from "@/app/context/profileContext";

export default async function servicesCategories() {
    const { profile } = useProfile();

    const api_URL = "https://realestate.learnock.com/";
    const apiKey = 1234;
    const token =localStorage.getItem("userToken");

    const response = await fetch(`${api_URL}api/services/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "apiKey": apiKey,
            "Authorization": `Bearer ${token}`
        },
    });

    const ParsedResponse = await response.json();
    console.log("Parsed response categories", ParsedResponse);

    const cat_services = ParsedResponse?.data || []; // Handle undefined case
    const isTenant = profile?.data?.role === "tenant";

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-center text-xl font-bold mb-4">Services Categories</h2>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Services Category List</span>
                    {!isTenant && <AddCategoryButton type="properties" />}

                </div>
                {/* Column Titles */}
                <div className="flex justify-between font-bold text-lg bg-gray-200 p-2 rounded">
                    <span className="w-1/4 text-center">ID</span>
                    <span className="w-2/4 text-center">Category Name</span>
                    {!isTenant && <span className="w-1/4 text-center"></span>}

                </div>

                <ul className="space-y-2 mt-2">
                    {cat_services.length > 0 ? (
                        cat_services.map((category) => (
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
                        <p className="text-center">No services categories available</p>
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
}
