import React from "react";

function ReserveButton({ avgStarRating, numReviews, price }) {

    let starContainer;
    if (numReviews > 0) {
        const reviewPlural = numReviews > 1 ? 'reviews' : 'review';
        starContainer = (
        <div>
            <i className="fa-solid fa-star"></i>
            <p>{avgStarRating}</p>
            <p>{numReviews + ' ' + reviewPlural}</p>
        </div>
        );
    } else {
        starContainer = (
        <div>
            <i className="fa-solid fa-star"></i>
            <p>New</p>
        </div>
        );
    }
    return (
        <div>

            <div>

                <div>
                    {price + ' night'}
                </div>

                <div>
                    {starContainer}
                </div>

            </div>

            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    alert('Feature coming soon')
                }}>Reserve</button>
            </div>

        </div>
    )
}

export default ReserveButton;
