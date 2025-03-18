"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UserActions from "../GetAllUsers/UpdateAndDelete";

export default function UserCard({ profile }) {
    const [img, setImg] = useState(null);

    useEffect(() => {
        // Only access localStorage in the client
        const storedImage = localStorage.getItem("userImage");
        if (storedImage) {
            setImg(storedImage);
        }
    }, []);

    // Construct full image URL
    const imageUrl = img ? `https://realestate.learnock.com/api/storage/images/cus1aTeeWZ1vq3s8iqdiUN2DJj3lc6zPmNADkeMw.jpg
    ` : "/user.jpg";

    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <Link href={`/users/${profile.id}`}>
                <div className="cursor-pointer hover:shadow-lg transition">
                    <Image
                        src="/user.jpg"
                        alt="User Image"
                        width={80}
                        height={80}
                        className="rounded-full mx-auto"
                    />
                    <h2 className="text-lg font-semibold mt-2">
                        {profile.first_name} {profile.last_name}
                    </h2>
                    <p className="text-gray-500">{profile.email}</p>
                    <p className="text-gray-400">Role: {profile.role}</p>
                </div>
            </Link>

            <UserActions profile={profile} />
        </div>
    );
}
