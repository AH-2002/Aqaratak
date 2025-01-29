import Image from "next/image";
import Link from 'next/link';
export default function home() {
    return (
        <section className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-white'>
            <nav className="bg-transparent">
                <div className="">
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between">
                            <div style={{ marginRight: "70px", marginTop: '5px', alignItems: 'center' }}>
                                <Image
                                    src='/logo.png'
                                    alt='Logo'
                                    width={50}
                                    height={50}
                                />
                            </div>

                            <div className="flex items-center text-center space-x-10">
                                <Link href="/site/home">
                                    <button>Home</button>
                                </Link>
                                <Link href="/site/rent">
                                    <button>Rent</button>
                                </Link>
                                <Link href="/site/services">
                                    <button>Services</button>
                                </Link>
                                <Link href="/site/favourite">
                                    <button>Favourite</button>
                                </Link>

                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-800 hover:text-gray-600 px-10 py-2 rounded-md text-sm font-medium">Sign In</button>
                            <button className="bg-purple-500 text-white px-10 py-2 rounded-md text-sm font-medium hover:bg-purple-600">Sign Up</button>
                        </div>
                    </div>
                </div>
            </nav>
            <main style={{ padding: '20px 0', width: '100%', height: '100vh', position: 'relative' }}>
                <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                    <Image
                        src='/background3.jpg'
                        alt='Background'
                        layout='fill'
                        objectFit='cover'
                        style={{ filter: 'brightness(60%)', borderRadius: '10px' }}
                    />
                    <p style={{ fontSize: '50px', color: 'White', position: 'absolute', top: '25%', left: '525px', width: '600px', textAlign: 'center' }}>Let's find a villa That's Perfect for you</p>
                    <div style={{
                        background: 'white', width: '90%', padding: "20px",
                        display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
                        position: 'absolute', bottom: '100px', left: '80px', borderRadius: '10px'
                    }}>
                        <div>
                            <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} for="first-input">
                                Looking for
                            </label>
                            <input
                                type="email"
                                className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                id="first-input"
                                placeholder='What are you look for?'
                                style={{ border: '1px solid gray', borderRadius: '10px' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} for="first-input">
                                Type
                            </label>
                            <input
                                type="email"
                                className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                id="first-input"
                                placeholder='What are you look for?'
                                style={{ border: '1px solid gray', borderRadius: '10px' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} for="first-input">
                                Price
                            </label>
                            <input
                                type="email"
                                className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                id="first-input"
                                placeholder='What are you look for?'
                                style={{ border: '1px solid gray', borderRadius: '10px' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} for="first-input">
                                Location
                            </label>
                            <input
                                type="email"
                                className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                id="first-input"
                                placeholder='What are you look for?'
                                style={{ border: '1px solid gray', borderRadius: '10px' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bolder', fontSize: 'larger' }} for="first-input">
                                Location
                            </label>
                            <input
                                type="email"
                                className="peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                id="first-input"
                                placeholder='What are you look for?'
                                style={{ border: '1px solid gray', borderRadius: '10px' }}
                            />
                        </div>
                        <div style={{ marginTop: '25px' }}>
                            <input
                                type="search"
                                className="text-center bg-purple-500 peer block min-h-[auto] bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                                id="first-input"
                                placeholder='search'
                                style={{ border: 'none', borderRadius: '10px' }}
                            />
                        </div>
                    </div>
                </div>

            </main>
        </section>
    )
}
