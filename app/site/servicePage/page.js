import axios from "axios";
import ServiceCard from "../Cards/serviceCard";
const API_URL = "";
export default async function servicePage() {
    const API_URL = "http://localhost:3001";

    try {
        const response = await axios.get(`${API_URL}/services`);
        const serviceList = response.data;

        return (
            <section style={{ padding: '50px 0' }}>
                <h1 style={{ fontWeight: 'bolder', fontSize: 'larger', marginBottom: '25px' }}>
                    Explore our Apartments for Service
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceList.length > 0 ? (
                        serviceList.map((item) => (
                            <ServiceCard key={item.id} service={item} />
                        ))
                    ) : (
                        <p>No services available.</p>
                    )}
                </div>
            </section>
        );
    } catch (error) {
        return <p>Error fetching services: {error.message}</p>;
    }
}
