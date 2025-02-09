import Image from "next/image"

export default function Footer() {
    return (
        <section style={{ padding: '20px 0', color: 'white', background: 'linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))' }}>
            <div style={{ width: '90%', margin: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div>
                        <div>
                            <Image src="/logo.png" alt="Logo" width={70} height={70} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: 'larger', fontWeight: 'bolder', margin: '10px 0' }}>Aqar tech</h2>
                            <p style={{ maxWidth: '500px' }}>
                                Aqar tech is a cutting-edge real estate technology platform that streamlines porperty management, buying, and selling through innovative digital solutions.
                            </p>
                        </div>

                    </div>
                    <div>

                        <h3 style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                            Project
                        </h3>
                        <ul style={{ listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                            <li style={{ margin: '10px 0' }}>
                                Download
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Changing
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Commision Icons
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                All Versions
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                            Community
                        </h3>
                        <ul style={{ listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <li style={{ margin: '10px 0' }}>
                                Github
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Icon Requests
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Twitter
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Blog Awesome
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                            Help
                        </h3>
                        <ul style={{ listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <li style={{ margin: '10px 0' }}>
                                Support
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Troubleshooting
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Contact Us
                            </li>
                            <li style={{ margin: '10px 0' }}>
                                Status
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                    <div>
                        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                            <li style={{ marginRight: '15px' }}>
                                License
                            </li>
                            <li style={{ marginRight: '15px' }}>
                                Terms of service
                            </li>
                            <li style={{ marginRight: '15px' }}>
                                Privacy Policy
                            </li>
                            <li style={{ marginRight: '15px' }}>
                                Refunds
                            </li>
                            <li style={{ marginRight: '15px' }}>
                                Cookie
                            </li>
                            <li style={{ marginRight: '15px' }}>
                                Preferences
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p> <i style={{ color: 'white' }} class="fa-regular fa-copyright"></i> Aqar tech 2024</p>
                    </div>
                </div>
            </div>
        </section>
    )
}