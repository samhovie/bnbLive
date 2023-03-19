import React from 'react';
import './SpotDetail.css';
import ReserveButton from '../ReserveButton';

function SpotDetail({ firstName, description, avgStarRating, numReviews }) {

    return (
      <div>

        <div>
          <h4>{'Hosted by ' + firstName}</h4>
          <p>{description}</p>
        </div>

        <ReserveButton
          avgStarRating={avgStarRating}
          numReviews={numReviews}
        ></ReserveButton>




      </div>
    );
}

export default SpotDetail;
