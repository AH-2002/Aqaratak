import Link from "next/link";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Map from "./Map";
import Slider from "./Slider";

export default function detailsPage() {
    return (
        <>
            <Navbar />
            <section className="rentPage max-w-8xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                <main
                    className="rentMain"
                    style={{
                        marginBottom: "10px",
                        width: "100%",
                        height: "100vh",
                        position: "relative",
                        background: "transparent",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        className='map'
                        style={{
                            width: "49%",
                            height: "100vh",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Map />
                    </div>

                    <div className='details' style={{ width: "49%", height: "100vh" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <div style={{ width: "48.5%" }}>
                                <Slider />
                            </div>
                            <div style={{ width: "48.5%" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Most Popular</p>
                                    <i style={{ color: "gray", fontSize: "larger" }} className="fa-solid fa-share-nodes"></i>
                                </div>
                                <h2 style={{ fontSize: "large", fontWeight: "bold", marginTop: "15px" }}>
                                    Cosy apartment for rent
                                </h2>
                                <p style={{ margin: "20px 0 20px 20px" }}>
                                    <i style={{ color: "gray", marginRight: "10px" }} className="fa-solid fa-location-dot"></i>
                                    Abudhabi
                                </p>

                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center", marginTop: "10px" }}>
                                    <div style={{ marginRight: "20px" }}>
                                        <p style={{ color: "gray" }}>
                                            <i style={{ marginRight: "10px" }} className="fa-solid fa-arrows-left-right-to-line"></i>
                                            200,000
                                        </p>
                                    </div>
                                    <div style={{ marginRight: "20px" }}>
                                        <p style={{ color: "gray" }}>
                                            <i className="fa fa-bed"></i> 4
                                        </p>
                                    </div>
                                    <div style={{ marginRight: "20px" }}>
                                        <p style={{ color: "gray" }}>
                                            <i className="fa-solid fa-bath"></i> 5
                                        </p>
                                    </div>
                                </div>

                                <p style={{ margin: "20px 0" }}>
                                    Located on the plateau central and close to all amenities, this apartment's location on the first
                                    floor of a downtown building will be ideal for your...
                                </p>

                                <p style={{ fontWeight: "bold", fontSize: "large" }}>Retail price: 500,000 ADE / night</p>
                                <Link href='/site/ApartmentDetails'>
                                    <button
                                        className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        style={{
                                            marginTop: "20px",
                                            background: "linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))",
                                            color: "white",
                                            padding: "20px",
                                            borderRadius: "20px",
                                            textAlign: "center",
                                            display: "block",
                                        }}
                                    >
                                        Show more details
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div style={{ marginTop: "20px", height: "1px", width: "100%", background: "gray" }}></div>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
}
