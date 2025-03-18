"use client";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

export default function AddCategoryButton({type}) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add Category
            </button>

            {isFormOpen && <CategoryForm onClose={() => setIsFormOpen(false)} type={type} />}
        </div>
    );
}
