import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Card from "./Card";
export default function Explore() {
    const data = [{
        id: 1,
        src: "/background3.jpg",
        title: "Griya Aari tamansari",
        alt: "A scenic view",
        price: '500,000 AED'
    },
    {
        id: 2,
        src: "/background3.jpg",
        title: "Griya Aari tamansari",
        alt: "A scenic view",
        price: '500,000 AED'
    },
    {
        id: 3,
        src: "/background3.jpg",
        title: "Griya Aari tamansari",
        alt: "A scenic view",
        price: '500,000 AED'
    }
    ];
    console.log("Data received:", data);
    return (
        <section style={{ padding: '50px 0' }}>
            <h1 style={{ fontWeight: 'bolder', fontSize: 'larger', marginBottom: '25px' }}>Explore our Apartments for purchasing</h1>
            <div className='flex flex-wrap gap-4 justify-between'>
                {(data.map((item) => (
                    <Card
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        title={item.title}
                        price={item.price}
                    />
                )))}

            </div>
        </section >
    )

}