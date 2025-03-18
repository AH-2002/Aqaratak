"use client";

import { useState, useEffect } from "react";
import { getUserToken } from "@/app/userRole/getUserToken";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editPostId, setEditPostId] = useState(null);

    const api_URL = "https://realestate.learnock.com/api/posts";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = await getUserToken();
            const response = await fetch(api_URL, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPosts(data.data);
        } catch (err) {
            setError("Failed to fetch posts");
        }
    };

    const handleCreatePost = async () => {
        setLoading(true);
        try {
            const token = await getUserToken();
            const response = await fetch(api_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                alert("Post created successfully!");
                setTitle("");
                setDescription("");
                fetchPosts();
            } else {
                setError("Failed to create post");
            }
        } catch (err) {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    const handleDeletePost = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const token = await getUserToken();
            const response = await fetch(`${api_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.ok) {
                alert("Post deleted successfully");
                fetchPosts();
            } else {
                setError("Failed to delete post");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const handleEditPost = (post) => {
        setEditPostId(post.id);
        setTitle(post.title);
        setDescription(post.description);
    };

    const handleUpdatePost = async () => {
        if (!editPostId) return;
        setLoading(true);
        try {
            const token = await getUserToken();
            const response = await fetch(`${api_URL}/${editPostId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": apiKey,
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                alert("Post updated successfully!");
                setEditPostId(null);
                setTitle("");
                setDescription("");
                fetchPosts();
            } else {
                setError("Failed to update post");
            }
        } catch (err) {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Manage Posts</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 mr-2"
                />
                {editPostId ? (
                    <button
                        onClick={handleUpdatePost}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Post"}
                    </button>
                ) : (
                    <button
                        onClick={handleCreatePost}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Post"}
                    </button>
                )}
            </div>

            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="border p-4 mb-2 flex justify-between">
                        <div>
                            <h2 className="text-lg font-bold">{post.title}</h2>
                            <p>{post.description}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEditPost(post)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
