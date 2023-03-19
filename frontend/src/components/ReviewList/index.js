import React from "react";

function ReviewList() {

    const reviews =[];


    return (
        <div>

        <ul>
      {reviews.map(review =>

        <li key={review.id}>
          <ReviewCard review={review}></ReviewCard>
        </li>

        )}

        </ul>


      </div>
    )
}

export default ReviewList;
