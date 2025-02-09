import Image from "next/image"
import Link from "next/link"
import Footer from "../Footer"
import Navbar from "../Navbar"

export default function ApartmentDetails() {
    return (
        <section className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Navbar />
            <main style={{ paddingTop: '10px', width: '100%', background: 'transparent' }}>
                <div style={{ width: '100%', height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <Image
                            src='/background3.jpg'
                            alt='Background'
                            layout='fill'
                            objectFit='cover'
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                </div>
                <div className='apartmentDetails' style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0 15px 0' }}>
                    <div className='gallery' style={{ width: '64%' }}>
                        <div>
                            <p style={{ fontSize: 'large' }}>
                                Griya Asri tamansari
                            </p>
                            <p style={{ margin: "20px 0 20px 10px" }}>
                                <i style={{ color: "gray", marginRight: "10px" }} className="fa-solid fa-location-dot"></i>
                                Abudhabi
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                <span style={{ fontWeight: 'bolder', fontSize: 'larger' }}>Description:</span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.
                                Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.
                                Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus.
                            </p>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                                <div style={{ position: 'relative', height: '25vh' }}>
                                    <Image
                                        src='/background3.jpg'
                                        alt='Background'
                                        layout='fill'
                                        objectFit='cover'
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                                <div style={{ position: 'relative', height: '25vh' }}>
                                    <Image
                                        src='/background3.jpg'
                                        alt='Background'
                                        layout='fill'
                                        objectFit='cover'
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                                <div style={{ position: 'relative', height: '25vh' }}>
                                    <Image
                                        src='/background3.jpg'
                                        alt='Background'
                                        layout='fill'
                                        objectFit='cover'
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='brief' style={{ width: '34%' }}>
                        <div style={{ width: '100%', boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} className="rounded-2xl overflow-hidden shadow-lg bg-white p-5">
                            <div>
                                <p>
                                    Brief Information
                                </p>
                                <p style={{ fontWeight: 'bold', fontSize: 'large', margin: '15px 0' }}>
                                    Owner: dubi real estate agency
                                </p>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'center',
                                padding: '20px', borderRadius: '20px'
                            }} className='bg-gray-200 text-color'>
                                <div style={{ marginRight: '20px' }}>
                                    <p> <i className="fa fa-bed"></i> 4</p>
                                </div>
                                <div style={{ marginRight: '20px' }}>
                                    <p> <i className="fa-solid fa-bath"></i> 5</p>
                                </div>
                                <div style={{ marginRight: '' }}>
                                    <p> <i className="fa-solid fa-arrows-left-right-to-line"></i> 200,000 M</p>
                                </div>
                            </div>
                            <div
                                className='rentalPeriod'
                                style={{
                                    display: "flex",
                                    border: "2px solid #ccc",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    width: "500px",
                                    textAlign: "center",
                                    fontFamily: "Arial, sans-serif",
                                    margin: '20px 0'
                                }}
                            >
                                <div style={{ flex: 1, padding: "20px", background: "#fff" }}>
                                    <p>1-week rental:</p>
                                    <strong>500,000 AED</strong>
                                </div>

                                <div style={{ width: "2px", background: "#ccc" }}></div>

                                <div style={{ flex: 1, padding: "20px", background: "#fff" }}>
                                    <p>1-Year rental:</p>
                                    <strong>6,000,000 AED</strong>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Link href="/site/Plans">
                                    <button
                                        type="button"
                                        className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        style={{ background: 'linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))', color: 'white', padding: '20px', borderRadius: '30px' }}>
                                        View more plans  <span style={{ marginLeft: '10px' }}><i class="fa fa-arrow-right"></i></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </section>

    )
}