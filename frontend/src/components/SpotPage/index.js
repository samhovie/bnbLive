import React,  { useEffect } from "react";
import ImageGrid from '../ImageGrid'
import SpotDetail from '../SpotDetail'
import ReviewList from "../ReviewList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";


function SpotPage() {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot);

    // const images = '';
    const reviews =  Object.values(useSelector(state => state.reviews.spot));


    // COMBINE v ?

    useEffect(() => {
        dispatch(spotActions.loadOneSpot(spotId));

    }, [ dispatch, spotId ])

    useEffect(() => {
      dispatch(reviewActions.loadAllReviews(spotId));
    },[ dispatch, spotId ] )



    console.log(spot.price)
    return (
        <div>


            <div>

                <h2>{spot.name}</h2>
                <p>{spot.city + ', ' + spot.state + ', ' + spot.country}</p>

            </div>

            <ImageGrid images={spot.SpotImages}></ImageGrid>



            <SpotDetail
                firstName={spot.Owner.firstName}
                description={spot.description}
                avgStarRating={spot.avgStarRating}
                numReviews={spot.numReviews}
                price={spot.price}
            ></SpotDetail>

            <ReviewList reviews={reviews}></ReviewList>


        </div>
    )
}

export default SpotPage;
