import React,  { useEffect } from "react";
import ImageGrid from '../ImageGrid'
import SpotDetail from '../SpotDetail'
import ReviewList from "../ReviewList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { ModalBtn } from "../../App";


function SpotPage() {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot);
    const sessionUser = useSelector(state => state.session.user);

    // const images = '';
    const reviews =  Object.values(useSelector(state => state.reviews.spot));


    let reviewTitle;
    if (spot.numReviews > 0) {
        const reviewPlural = spot.numReviews > 1 ? 'reviews' : 'review';
        reviewTitle = (
        <div>
            <i className="fa-solid fa-star"></i>
            <p>{spot.avgStarRating}</p>
            <p>{spot.numReviews + ' ' + reviewPlural}</p>
        </div>
        );
    } else {
        reviewTitle = (
        <div>
            <i className="fa-solid fa-star"></i>
            <p>New</p>
        </div>
        );
    }



    // COMBINE v ?

    useEffect(() => {
        dispatch(spotActions.loadOneSpot(spotId));

    }, [ dispatch, spotId ])

    useEffect(() => {
      dispatch(reviewActions.loadAllReviews(spotId));
    },[ dispatch, spotId ] )




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

            {reviewTitle}

            {
                sessionUser &&
                sessionUser.id !== spot.ownerId &&
                !reviews.find(review => review.userId === sessionUser.id) &&
                (<ModalBtn type={'post_review'}></ModalBtn>)
            }



            <ReviewList reviews={reviews}></ReviewList>


        </div>
    )
}

export default SpotPage;
