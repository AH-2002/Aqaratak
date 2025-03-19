import { getUserToken } from "@/app/userRole/getUserToken";
import { revalidatePath } from "next/cache";
import Navbar from "../Navbar";
import Footer from "../Footer";

import AddPropertyButton from "./AddPropertButton";
import RentCard from "@/app/site/Cards/RentCard1";

export default async function RentPage() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const token = await getUserToken();

    let properties = [];
    let error = null;

    try {
        const response = await fetch(`${api_URL}api/properties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store", // Ensures fresh data every time
        });

        if (!response.ok) throw new Error("Failed to fetch properties");

        const parsedResponse = await response.json();
        properties = parsedResponse?.data || [];
    } catch (err) {
        console.error("Error fetching properties:", err);
        error = err.message;
    }

    // Function to refresh properties list
    const refreshProperties = async () => {
        "use server";
        revalidatePath("/properties");
    };

    return (
        <>
            <Navbar />
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Explore Our Apartments for Rent</h1>
                    <AddPropertyButton refreshProperties={refreshProperties} />
                </div>

                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : properties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((item) => (
                            <RentCard key={item.id} property={item} refreshProperties={refreshProperties} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No properties available.</p>
                )}
            </section>
            <Footer />
        </>
    );
}
