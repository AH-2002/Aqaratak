// FavoriteButton.js
'use client';

import { useState } from "react";

export default function FavouriteButton() {
    const [isFavourite, setIsFavourite] = useState(false);

    return (
        <div
            style={{
                background: 'white', position: 'absolute', top: '10px', right: '10px',
                padding: '10px', borderRadius: '50%', width: '50px', height: '50px',
                textAlign: 'center', fontSize: '25px', cursor: 'pointer'
            }}
            onClick={() => setIsFavourite(!isFavourite)}
        >
            <i
                className={`fa-heart ${isFavourite ? "fa-solid text-red-500" : "fa-regular text-black"}`}
            ></i>
        </div>
    );
}
