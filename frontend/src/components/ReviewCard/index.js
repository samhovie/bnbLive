import React from 'react';


function ReviewCard({ review }) {

    const monthArr = ['January', 'February', 'March',
                      'April', 'May', 'June', 'July',
                      'August', 'September', 'October',
                      'November', 'December'];

    const date = new Date(review.createdAt);
    const month = monthArr[date.getMonth() - 1];
    const year = date.getFullYear();

    return (
        <div>
            <h4>{review.User.firstName}</h4>
            <h5>{month + ' ' + year}</h5>
            <p>{review.review}</p>
        </div>
    );

}

export default ReviewCard;
