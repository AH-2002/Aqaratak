"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Verification() {
    const api_URL = "https://realestate.learnock.com/";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const router = useRouter();
    const inputsRef = useRef([]);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
    const [error, setError] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const stored_email = localStorage.getItem("user_email");
        if (stored_email) {
            setEmail(stored_email);
        } else {
            router.push("/auth/signup");
        }
    }, [router]);

    useEffect(() => {
        if (resendDisabled) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        setResendDisabled(false);
                        clearInterval(interval);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendDisabled]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input
        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            setError("Please enter a 6-digit OTP");
            return;
        }

        const response = await fetch(`${api_URL}api/auth/validate_otp_mail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
            },
            body: JSON.stringify({ email, otp: enteredOtp }),
        });

        if (response.ok) {
            alert("OTP Verified");
            localStorage.removeItem("user_email");
            router.push("/signin");
        } else {
            setError("Invalid OTP, please try again");
        }
    };

    const handleResendOtp = async () => {
        setResendDisabled(true);
        setTimer(30);

        const response = await fetch(`${api_URL}auth/otp_mail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apiKey": apiKey,
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            setError("Failed to resend OTP. Try again later.");
        }
    };

    return (
        <section style={{ width: '95%', margin: 'auto', padding: '10px 0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
            {/* Logo */}
            <nav style={{ height: '10%' }}>
                <Image src='/logo.png' alt='Logo' width={70} height={70} />
            </nav>

            <div className="container" style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                
                {/* Heading */}
                <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>Verify your mail</h1>
                <p style={{ color: 'gray', fontSize: '12px', margin: '20px 0 30px 0' }}>
                    Enter the verification code sent to your email <strong>{email}</strong>
                </p>

                {/* OTP Inputs */}
                <form onSubmit={handleVerify} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            style={{
                                height: '55px',
                                width: '55px',
                                border: 'gray solid 1px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                fontSize: 'large',
                            }}
                        />
                    ))}
                </form>

                {/* Error Message */}
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                {/* Resend OTP */}
                <div>
                    <button
                        onClick={handleResendOtp}
                        disabled={resendDisabled}
                        style={{
                            color: 'purple',
                            fontSize: '14px',
                            marginTop: '30px',
                            background: 'none',
                            border: 'none',
                            cursor: resendDisabled ? 'not-allowed' : 'pointer',
                        }}>
                        {resendDisabled ? `Resend OTP in ${timer}s` : "Didn't receive a code? Resend"}
                    </button>
                </div>

                {/* Verify Button */}
                <button
                    type="submit"
                    onClick={handleVerify}
                    style={{
                        background: 'linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))',
                        color: 'white',
                        padding: '15px 0',
                        width: '100%',
                        maxWidth: '250px',
                        borderRadius: '30px',
                        fontSize: '16px',
                        marginTop: '20px',
                        border: 'none',
                        cursor: 'pointer',
                    }}>
                    Verify
                </button>

                {/* Terms & Conditions */}
                <p style={{ fontSize: '14px', marginTop: '20px' }}>
                    By proceeding, you agree to the
                    <span style={{ color: 'purple', cursor: 'pointer' }}> terms and conditions </span>
                    and
                    <span style={{ color: 'purple', cursor: 'pointer' }}> privacy policy</span>.
                </p>
            </div>
        </section>
    );
}
