import React from 'react';


function ReviewCard({ review }) {

    return (
        <div>
            <h4>{review.User.firstName}</h4>
            <h5>Month Year</h5>
            <p>{review.review}</p>
        </div>
    );

}

export default ReviewCard;
