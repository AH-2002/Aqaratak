import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
export default function Card({ id, src, title, alt, price }) {
    
    return (
            <div style={{width:'30%'}} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                    <Image
                        src={src}
                        alt={alt}
                        layout='fill'
                        objectFit='cover' />
                    <div style={{
                        background: 'white', position: 'absolute', top: '10px', right: '10px',
                        padding: '10px', borderRadius: '50%', width: '50px', height: '50px', textAlign: 'center', fontSize: '25px'
                    }}>
                        <i style={{ color: 'black', }} className="fa-regular fa-heart"></i>
                    </div>
                </div>
                <div className="p-5">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <p>{price}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <p style={{ color: 'gray' }} > <i className="fa fa-bed"></i> 4</p>
                        </div>
                        <div style={{ marginRight: '10px' }}>
                            <p style={{ color: 'gray' }} > <i className="fa-solid fa-bath"></i> 5</p>
                        </div>
                        <div style={{ marginRight: '10px' }}>
                            <p style={{ color: 'gray' }} > <i className="fa-solid fa-arrows-left-right-to-line"></i> 200,000 M</p>
                        </div>
                        <div style={{ marginRight: '10px' }}>
                            <p style={{ color: 'gray' }} > <i className="fa-solid fa-location-dot"></i> Abudhabi</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}