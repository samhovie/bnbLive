import React from "react";
import ReviewCard from '../ReviewCard'

function ReviewList() {

    const reviews =[];


    return (
        <div>

        <ul>
      {reviews.map(review =>

        <li key={review.id}>
          <ReviewCard ></ReviewCard>
        </li>

        )}

        </ul>


      </div>
    )
}

export default ReviewList;
