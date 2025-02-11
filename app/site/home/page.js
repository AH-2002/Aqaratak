import Image from "next/image";
import Brands from "./Brands";
import Purchase from "./Purchase";
import Rent from "./Rent";
import ScrollToUp from "./ScrollToUp";
import Service from "./Service";
import Navbar from "../Navbar";
import Footer from "../Footer";
export default function Home() {
    return (
        <section className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Navbar />
            <main style={{ padding: '20px 0', width: '100%', height: '100vh', position: 'relative', background: 'transparent' }}>
                <div style={{ width: '100%', height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <Image
                            src='/background3.jpg'
                            alt='Background'
                            layout='fill'
                            objectFit='cover'
                            style={{ filter: 'brightness(60%)', borderRadius: '10px' }}
                        />
                    </div>
                    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center',width:'100%' }}>
                        <p style={{ fontSize: '50px', color: 'White', width: '95%', textAlign: 'center' }}>Let's find a villa That's Perfect for you</p>
                        <div className='inputs' style={{
                            background: 'white', width: '95%', padding: "20px",
                            display: 'flex', justifyContent:'space-between', alignItems: 'center', flexWrap: 'wrap',
                            borderRadius: '10px',
                        }}>
                            
                            <div className='input'>
                                <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} htmlfor="first-input">
                                    Looking for
                                </label>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                    id="first-input"
                                    placeholder='What are you look for?'
                                    style={{ border: '1px solid gray', borderRadius: '10px' }}
                                />
                            </div>
                            <div className='input'>
                                <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} htmlfor="first-input">
                                    Type
                                </label>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                    id="first-input"
                                    placeholder='What are you look for?'
                                    style={{ border: '1px solid gray', borderRadius: '10px' }}
                                />
                            </div>
                            <div className='input'>
                                <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} htmlfor="first-input">
                                    Price
                                </label>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                    id="first-input"
                                    placeholder='What are you look for?'
                                    style={{ border: '1px solid gray', borderRadius: '10px' }}
                                />
                            </div>
                            <div className='input'>
                                <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} htmlfor="first-input">
                                    Location
                                </label>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                    id="first-input"
                                    placeholder='What are you look for?'
                                    style={{ border: '1px solid gray', borderRadius: '10px' }}
                                />
                            </div>
                            <div className='input'>
                                <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} htmlfor="first-input">
                                    Location
                                </label>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                    id="first-input"
                                    placeholder='What are you look for?'
                                    style={{ border: '1px solid gray', borderRadius: '10px' }}
                                />
                            </div>
                            <div className='input' style={{ marginTop: '25px' }}>
                                <input
                                    type="search"
                                    className="text-center bg-purple-500 peer block min-h-[auto] px-3 py-[0.32rem] leading-[1.6] dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                    id="first-input"
                                    placeholder='search'
                                    style={{ border: 'none', borderRadius: '10px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Brands />
            <Purchase />
            <Rent />
            <Service />
            <ScrollToUp />
            <Footer />
        </section>
    )
}
