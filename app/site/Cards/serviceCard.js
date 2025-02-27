import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import FavouriteButton from "../home/FavouriteButton";
export default function serviceCard({ service }) {

    return (
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
                <FavouriteButton />
            </div>
            <div className="p-5">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    <p>{`${service.price} ${service.price_unit}`}</p>
                </div>
            </div>
        </div>

    );
}