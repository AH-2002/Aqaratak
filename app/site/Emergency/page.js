"use client";
import { useState, useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function EmergencyRequests() {
    const api_URL = "https://realestate.learnock.com/api/emergency-requests";
    const apiKey = 1234;
    const token = localStorage.getItem("userToken");

    const defaultFormData = {
        emergency_type: "",
        status: "pending",
        priority: "emergency",
        property_id: null,
        tenant_id: ""
    };

    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState(defaultFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch(api_URL, {
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch requests");
            setRequests(data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const method = editingRequest ? "PUT" : "POST";
            const url = editingRequest ? `${api_URL}/${editingRequest.id}` : api_URL;

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to process request");

            fetchRequests();
            setShowForm(false);
            setEditingRequest(null);
            setFormData(defaultFormData); // Reset form
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (request) => {
        setFormData(request);
        setEditingRequest(request);
        setShowForm(true);
    };

    const handleNewRequest = () => {
        setFormData(defaultFormData); // Reset form before opening
        setEditingRequest(null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this request?")) return;
        try {
            const response = await fetch(`${api_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to delete request");
            fetchRequests();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Emergency Requests</h2>
                <button onClick={handleNewRequest} className="bg-green-600 text-white py-2 px-4 rounded-md">+ New Request</button>

                {showForm && (
                    <div className="mt-4 p-4 border rounded bg-white shadow-md relative">
                        {/* ❌ Close Button */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 text-xl font-bold text-red-600"
                        >
                            ✖
                        </button>


                        <form onSubmit={handleSubmit}>
                            <label className="block">Emergency Type:</label>
                            <input type="text" name="emergency_type" value={formData.emergency_type} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

                            <label className="block">Status:</label>
                            <select name="status" value={formData.status} onChange={handleChange} required className="w-full p-2 border rounded mb-2">
                                <option value="pending">Pending</option>
                                <option value="resolved">Resolved</option>
                            </select>

                            <label className="block">Priority:</label>
                            <select name="priority" value={formData.priority} onChange={handleChange} required className="w-full p-2 border rounded mb-2">
                                <option value="emergency">Emergency</option>
                                <option value="normal">Normal</option>
                            </select>

                            <label className="block">Property ID:</label>
                            <input type="number" name="property_id" value={formData.property_id || ""} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

                            <label className="block">Tenant ID:</label>
                            <input type="number" name="tenant_id" value={formData.tenant_id} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

                            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
                                {loading ? "Processing..." : editingRequest ? "Update Request" : "Submit Request"}
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                )}

                <ul className="mt-6">
                    {requests.map((req) => (
                        <li key={req.id} className="p-4 border rounded shadow-md mb-2">
                            <p><strong>Type:</strong> {req.emergency_type}</p>
                            <p><strong>Status:</strong> {req.status}</p>
                            <p><strong>Priority:</strong> {req.priority}</p>
                            <p><strong>Property ID:</strong> {req.property_id}</p>
                            <p><strong>Tenant ID:</strong> {req.tenant_id}</p>
                            <p><strong>Created At:</strong> {new Date(req.created_at).toLocaleString()}</p>
                            <div className="mt-2 flex gap-2">
                                <button onClick={() => handleEdit(req)} className="bg-yellow-500 text-white py-1 px-3 rounded">Edit</button>
                                <button onClick={() => handleDelete(req.id)} className="bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}
