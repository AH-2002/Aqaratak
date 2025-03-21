"use client";

import { useState, useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
const api_URL = "https://realestate.learnock.com/api/properties/property-visits/";
const apiKey = 1234;

export default function VisitsPage() {
    const [visits, setVisits] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [visitTime, setVisitTime] = useState("");
    const [propertyId, setPropertyId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        if (userToken) {
            setToken(userToken);
            fetchVisits(userToken); // Ensure fetch runs only when the token is available
        }
    }, []);

    const fetchVisits = async (userToken) => {
        try {
            const response = await fetch(api_URL, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${userToken}`,
                },
            });

            console.log("🔹 Fetch Response:", response); // Debugging API response

            const data = await response.json();
            console.log("🔹 Fetched Visits Data:", data); // Log API data

            setVisits(data.data);
        } catch (err) {
            console.error("🔴 Fetch Error:", err);
            setError("Failed to fetch visits");
        }
    };

    const handleScheduleVisit = async () => {
        if (!token) {
            setError("User is not authenticated");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(api_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    phone_number: phone,
                    visit_date: visitDate,
                    visit_time: visitTime,
                    property_id: propertyId,
                }),
            });

            const data = await response.json(); // Properly assign API response
            console.log("🔹 Visit API Response:", data); // Debugging
            if (response.ok) {
                alert("Visit scheduled successfully!");
                setName("");
                setPhone("");
                setVisitDate("");
                setVisitTime("");
                setPropertyId("");
                fetchVisits(token); // Refresh visit list
            } else {
                setError(data.message || "Failed to schedule visit");
            }
        } catch (err) {
            console.error("🔴 API Error:", err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVisit = async (id) => {
        if (!confirm("Are you sure you want to delete this visit?")) return;
        if (!token) {
            setError("User is not authenticated");
            return;
        }

        try {
            const response = await fetch(`${api_URL}${id}`, {
                method: "DELETE",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Visit deleted successfully");
                fetchVisits(token);
            } else {
                setError("Failed to delete visit");
            }
        } catch (err) {
            console.error("🔴 Delete Error:", err);
            setError("Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Manage Property Visits</h1>
                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="time"
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="number"
                        placeholder="Property ID"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <button
                        onClick={handleScheduleVisit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Scheduling..." : "Schedule Visit"}
                    </button>
                </div>

                <ul>
                    {visits.map((visit) => (
                        <li key={visit.id} className="border p-4 mb-2 flex justify-between">
                            <div>
                                <h2 className="text-lg font-bold">{visit.name}</h2>
                                <p>Phone: {visit.phone_number}</p>
                                <p>Date: {visit.visit_date}</p>
                                <p>Time: {visit.visit_time}</p>
                                <p>Property ID: {visit.property_id}</p>
                            </div>

                            <button
                                onClick={() => handleDeleteVisit(visit.id)}
                                className="bg-red-500 text-white px-2 py-1 text-sm rounded"
                            >
                                Delete
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}
