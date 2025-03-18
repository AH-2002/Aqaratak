import ServiceCard from "../Cards/serviceCard";
import ServiceForm from "./ServiceForm";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { revalidatePath } from "next/cache";
import { getUserToken } from "@/app/userRole/getUserToken";

export default async function ServicePage() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const token = await getUserToken();

    let services = [];
    let error = null;

    try {
        const response = await fetch(`${api_URL}api/services`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch services");

        const parsedResponse = await response.json();
        services = parsedResponse?.data || [];
    } catch (err) {
        console.error("Error fetching services:", err);
        error = err.message;
    }

    const refreshServices = async () => {
        "use server";
        revalidatePath("/services");
    };

    return (
        <>
            <Navbar />
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Explore Our Apartments for Service</h1>
                    <ServiceForm onSuccess={refreshServices} />
                </div>

                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {services.map((item) => (
                            <ServiceCard key={item.id} service={item} refreshServices={refreshServices} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No services available.</p>
                )}
            </section>
            <Footer />
        </>
    );
}
