import React, { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
// import * as spotActions from '../../store/spots';
import { useParams } from 'react-router-dom';
import ReviewCard from '../ReviewCard/ReviewCard';
import * as reviewActions from '../../store/reviews';
import './SpotDetail.css';

function SpotDetail() {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const spot = useSelector((state) => state.spots.singleSpot);

    const reviews =  Object.values(useSelector(state => state.reviews.spot));



    // useEffect(() => {
    //     dispatch(spotActions.loadOneSpot(spotId));

    // }, [ dispatch, spotId ])

    useEffect(() => {
      dispatch(reviewActions.loadAllReviews(spotId));
    },[ dispatch, spotId ] )


    return (
        <div>
            {/* <ul>
        {spot.SpotImages.map(image =>
          <li key={image.id}>
            <img src={image.url} alt={image.url}></img>
          </li>

          )}

          </ul> */}

          <ul>
        {reviews.map(review =>
          <li key={review.id}>
            <ReviewCard review={review}></ReviewCard>
          </li>

          )}

          </ul>
        </div>
    );
}

export default SpotDetail;
