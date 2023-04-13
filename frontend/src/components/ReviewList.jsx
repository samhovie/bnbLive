import React
// { useEffect }
from "react";
import {
  useSelector,
  // useDispatch
} from 'react-redux';
// import * as reviewActions from '../../store/spots';
// import { NavLink, useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard";

function ReviewList() {

    const reviews = Object.values(useSelector(state => state.reviews.spot));



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
