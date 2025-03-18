import Image from "next/image";

export default function Brands() {

    return (
        <section style={{ padding: '30px 0', marginTop: '30px', background: 'white', borderRadius: '10px' }}>
            <p style={{ textAlign: 'center', fontSize: 'large', fontWeight: 'bold', marginTop: '10px' }}>
                Trusted by 20,000+ companies
            </p>
            <div className='brands' style={{ background: 'white', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                {["/google.jpg", "/booking.png", "/base.png", "/ms.png", "/ms.png"].map((src, index) => (
                    <div key={index} style={{ width: '250px', height: '150px', position: 'relative' }}>
                        <Image src={src} alt={`Brand ${index + 1}`} layout='fill' objectFit='cover' />
                    </div>
                ))}
            </div>
        </section>
    );
}
