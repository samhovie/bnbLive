import React, { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import * as spotActions from '../../store/spots'
import { useParams } from 'react-router-dom';
import './SpotDetail.css';

function SpotDetail() {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot);


    useEffect(() => {
        dispatch(spotActions.loadOneSpot(spotId));
    }, [ dispatch, spotId ])


    return (
        <div>
            <ul>
        {spot.SpotImages.map(image =>
          <li key={image.id}>
            <img src={image.url} alt={image.url}></img>
          </li>

          )}

          </ul>
        </div>
    );
}

export default SpotDetail;
