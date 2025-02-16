import Image from "next/image";
export default function Brands() {
    return (
        <section style={{ padding: '30px 0', marginTop: '30px', background: 'white',borderRadius:'10px' }}>
            <p style={{textAlign:'center',fontSize:'large',fontWeight:'bold',marginTop:'10px'}}>Trusted by 20,000+ companies</p>
            <div className='brands' style={{ background: 'white', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <div style={{ width: '250px', height: '150px', position: 'relative' }}>
                    <Image
                        src='/google.jpg'
                        alt='google'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div style={{ width: '250px', height: '150px', position: 'relative' }}>
                    <Image
                        src='/booking.png'
                        alt='Booking.com'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div style={{ width: '250px', height: '150px', position: 'relative' }}>
                    <Image
                        src='/base.png'
                        alt='Base Camp'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div style={{ width: '250px', height: '150px', position: 'relative' }}>
                    <Image
                        src='/ms.png'
                        alt='Microsoft'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div style={{ width: '250px', height: '150px', position: 'relative' }}>
                    <Image
                        src='/ms.png'
                        alt='Microsoft'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>

            </div>
        </section>
    )
}