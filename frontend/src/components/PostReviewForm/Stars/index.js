import React, { useState } from "react";
import './Stars.css'

function Stars({ rating, setRating }) {

    const [ activeRating, setActiveRating ] = useState(rating);

    const regular = <i className="fa-regular fa-star"></i>;
    const solid = <i className="fa-solid fa-star"></i>;

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="stars">
            {stars.map(star =>
                <div
                key={star}
                onMouseEnter={() => setActiveRating(star)}
                onMouseLeave={() => setActiveRating(rating)}
                onClick={() => setRating(star)}
                >{activeRating >= star ? solid : regular}
                </div>
            )}
            <p>stars</p>
        </div>
    )
}

export default Stars;
