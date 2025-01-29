import Image from "next/image"
export default function signin() {

    return (
        <section style={{ width: '95%', margin: 'auto', padding: '10px 0' }}>
            <nav>
                <Image
                    src='/logo.png'
                    alt='Logo'
                    width={70}
                    height={70}
                />
            </nav>

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '40px' }}>Sign in</h1>
                <p style={{ color: 'gray', margin: '8px 0 17px 0', fontSize: '10px' }}>Welcome! Please fill the details to get started.</p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='w-1/4 bg-transparent text-black hover:bg-gray-800 hover:text-white font-bold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'>
                        <span><i style={{ fontSize: 'large', marginRight: '4px' }} className="fab fa-google"></i></span> Sign in with email</button>

                    <button className='w-1/4 bg-transparent text-black hover:bg-gray-800 hover:text-white font-bold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300' style={{

                    }}><span><i style={{ fontSize: 'larger', marginRight: '4px' }} className="fab fa-facebook text-blue-600 group-hover:text-white transition"></i></span> Sign in with facebook</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0 10px 0' }}>
                    <div style={{ height: '1px', width: '25%', background: 'gray' }}></div>
                    <span style={{ margin: '0 10px', width: '4%', textAlign: 'center', color: 'gray' }}>or</span>
                    <div style={{ height: '1px', width: '25%', background: 'gray' }}></div>
                </div>
            </div >

            <div
                className="rounded-lg bg-white p-6 shadow-4 dark:bg-surface-dark"
                style={{ background: 'transparent', width: '65%', margin: 'auto' }}>
                <form className='signup-form'>

                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                            id="exampleInput125"
                            style={{ marginTop: '15px' }}
                        />
                        <label
                            for="exampleInput125"
                            className="absolute left-3 bottom-12 mb-0 text-neutral-500"
                        >Email address
                        </label>
                    </div>

                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                            id="exampleInput126"
                            style={{ marginTop: '38px' }}

                        />
                        <label
                            for="exampleInput126"
                            className="absolute left-3 bottom-12 mb-0 text-neutral-500"
                        >Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        style={{ background: 'linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))', color: 'white', padding: '20px', borderRadius: '30px' }}>
                        Continue  <span style={{ marginLeft: '10px' }}><i class="fa fa-arrow-right"></i></span>
                    </button>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                        <p style={{ fontSize: '14px' }}>
                            By proceeding, you agree to the
                            <span style={{ color: 'purple', cursor: 'pointer' }}> terms and conditions </span>
                            and
                            <span style={{ color: 'purple', cursor: 'pointer' }}> privacy policy</span>.
                        </p>
                    </div>
                </form>
            </div>
        </section >
    )
}