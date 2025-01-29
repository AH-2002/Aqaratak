import Image from "next/image";
import Link from 'next/link';

export default function register() {

    return (
        <section className='register' style={{ padding:'10px 0' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', margin: '0 50px' }}>
                <div>
                    <Image
                        src='/logo.png'
                        alt='Logo'
                        width={70}
                        height={70}
                    />
                </div>
                <div className="relative group" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} >
                    <span style={{ marginRight: '2px' }}>I'm located in </span>
                    <button
                        className="flex items-center bg-primary px-6 py-2 text-white rounded hover:bg-primary-accent focus:outline-none"
                        style={{ background: 'rgba(4, 4, 4, 0.132)', color: 'black', display: 'inline-block' }}
                    >
                        Choose Country
                    </button>

                    {/* Dropdown Menu */}
                    <ul style={{ background: 'rgba(4, 4, 4, 0.132)' }} className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg dark:bg-surface-dark group-hover:block hidden">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                            >
                                Egypt
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                            >
                                <span>United Arabic Emirates</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                            >
                                Something else here
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='max-w-screen-xl mx-auto px-4'>
                <div className='text-left sm:text-center'>
                    <h2>Create Aqar tech Account</h2>
                    <p className='my-5'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className='options mb-5'>
                    <Link href="/auth/signup">
                        <button className='w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-5 px-5 rounded focus:outline-none focus:ring-2 focus:ring-gray-300' style={{

                        }}><span><i className="fas fa-envelope" style={{ fontSize: 'large', marginRight: '4px' }}></i></span> Sign up with email</button>
                    </Link>
                    <button className='w-full bg-gray-300 hover:bg-gray-400 text-black font-bold my-3 py-5 px-5 rounded focus:outline-none focus:ring-2 focus:ring-gray-300' style={{

                    }}><span><i style={{ fontSize: 'large', marginRight: '4px' }} className="fab fa-google"></i></span> Sign up with email</button>

                    <button className='w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-5 px-5 rounded focus:outline-none focus:ring-2 focus:ring-gray-300' style={{

                    }}><span><i style={{ fontSize: 'larger', marginRight: '4px', color: 'blue' }} className="fab fa-facebook"></i></span> Sign up with facebook</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ height: '1px', width: '48%', background: 'gray' }}></div>
                        <span style={{ margin: '0 10px', width: '4%', textAlign: 'center', color: 'gray' }}>or</span>
                        <div style={{ height: '1px', width: '48%', background: 'gray' }}></div>
                    </div>
                    <div>
                        <p className='mt-5' style={{ fontWeight: 'bold' }}>Already have Aqar account? <span>
                            <Link href="/auth/signin">
                                <button style={{ cursor: 'pointer', color: 'purple' }}>Log in</button>
                            </Link>
                        </span>
                        </p>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <p style={{ fontSize: '14px' }}>
                        By proceeding, you agree to the
                        <span style={{ color: 'purple', cursor: 'pointer' }}> terms and conditions </span>
                        and
                        <span style={{ color: 'purple', cursor: 'pointer' }}> privacy policy</span>.
                    </p>
                </div>
            </div>
        </section >
    )
}
