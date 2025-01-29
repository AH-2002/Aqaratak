import Image from "next/image"
import Validation from "./Validation";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome styles

export default function signup() {

    return (
        <section style={{ width: '95%', margin: 'auto',padding:'10px 0' }}>
            <nav>
                <Image
                    src='/logo.png'
                    alt='Logo'
                    width={70}
                    height={70}
                />
            </nav>

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>Create Your Account</h1>
                <p style={{ color: 'gray', margin: '8px 0 17px 0', fontSize: '10px' }}>Welcome! Please fill the details to get started.</p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='w-1/4 bg-transparent text-black hover:bg-gray-800 hover:text-white font-bold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'>
                        <span><i style={{ fontSize: 'large', marginRight: '4px' }} className="fab fa-google"></i></span> Sign up with email</button>

                    <button className='w-1/4 bg-transparent text-black hover:bg-gray-800 hover:text-white font-bold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300' style={{

                    }}><span><i style={{ fontSize: 'larger', marginRight: '4px' }} className="fab fa-facebook text-blue-600 group-hover:text-white transition"></i></span> Sign up with facebook</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0 10px 0' }}>
                    <div style={{ height: '1px', width: '25%', background: 'gray' }}></div>
                    <span style={{ margin: '0 10px', width: '4%', textAlign: 'center', color: 'gray' }}>or</span>
                    <div style={{ height: '1px', width: '25%', background: 'gray' }}></div>
                </div>
            </div>

            <Validation />
                <div>
                    <p style={{ fontSize: '14px' }}>
                        By proceeding, you agree to the
                        <span style={{ color: 'purple', cursor: 'pointer' }}> terms and conditions </span>
                        and
                        <span style={{ color: 'purple', cursor: 'pointer' }}> privacy policy</span>.
                    </p>
                </div>
        </section >
    )
}