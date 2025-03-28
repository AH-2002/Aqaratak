"use client";
import { useProfile } from "@/app/context/profileContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteButton from "../favoritePage/FavoriteButton";
import DeletePropertyButton from "../RentPage/DeletePropertyButton";
import UpdatePropertyButton from "../RentPage/UpdatePropertyButton";

export default function RentCard({ property, refreshProperties }) {
    const { profile, loading } = useProfile(); // Extract loading state as well
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("userToken");
            setToken(storedToken);
            console.log("cardToken", storedToken);  // Logging stored token
        }
    }, []);

    // Ensure that profile data is loaded before rendering
    if (loading) {
        return <div>Loading...</div>;
    }

    const isTenant = profile?.data?.role === "tenant";
    return (
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <Link href={`/site/PropertyDetails/${property.id}`}>
                <div className="relative w-full h-56">
                    <Image src={property.image || "/user.jpg"} alt={property.title} layout="fill" objectFit="cover" />
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-center font-bold">
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                    <p>{`${property.price} ${property.price_unit}`}</p>
                </div>
                <div className="flex justify-start items-center mt-2 space-x-4 text-gray-500">
                    <p><i className="fa fa-bed"></i> {property.beds}</p>
                    <p><i className="fa-solid fa-bath"></i> {property.bathrooms}</p>
                    <p><i className="fa-solid fa-arrows-left-right-to-line"></i> {property.land_space} M</p>
                    <p><i className="fa-solid fa-location-dot"></i> {property.location}</p>
                </div>
                {token && !isTenant && (
                    <div className="flex justify-between mt-4">
                        <UpdatePropertyButton property={property} refreshProperties={refreshProperties} />
                        <DeletePropertyButton propertyId={property.id} refreshProperties={refreshProperties} />
                    </div>
                )}
                {token ? (
                    <div className="w-full mt-4">
                        <FavoriteButton favoritableId={property.id} favoritableType="property" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
