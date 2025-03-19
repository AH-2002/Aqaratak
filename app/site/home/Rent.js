import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import RentCard from "../Cards/RentCard";
export default async function Rent() {
    const API_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    try {
        const response = await fetch(`${API_URL}api/properties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey
            }
        });
        const jsonResponse = await response.json();
        console.log("rent data", response)
        console.log("json rent data", jsonResponse)
        const rentList = jsonResponse.data.slice(0,3);

        return (
            <section style={{ padding: '50px 0' }}>
                <h1 style={{ fontWeight: 'bolder', fontSize: 'larger', marginBottom: '25px' }}>
                    Explore our Apartments for rent
                </h1>
                <div className="purchase grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rentList.length > 0 ? (
                        rentList.map((item) => (
                            <RentCard key={item.id} property={item} />
                        ))
                    ) : (
                        <p>No properties available.</p>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <Link href="/site/RentPage">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                            See More
                        </button>
                    </Link>
                </div>
            </section>
        );
    } catch (error) {
        return <p>Error fetching properties:{error.message}</p>
    }
}