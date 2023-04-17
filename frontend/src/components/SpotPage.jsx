import React, { useEffect } from "react";
import ReviewList from "./ReviewList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../store/spots";
import * as reviewActions from "../store/reviews";
import { ModalBtn } from "../App";
import ReserveButton from "./ReserveButton";
import CardList from "./CardList";

function SpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot);
    const sessionUser = useSelector((state) => state.session.user);

    // const images = '';
    const reviews = Object.values(useSelector((state) => state.reviews.spot));

    let reviewTitle;
    if (spot.numReviews > 0) {
        const reviewPlural = spot.numReviews > 1 ? "reviews" : "review";
        // card ?
        reviewTitle = (
            <div>
                <i className="fa-solid fa-star"></i>
                <p>{spot.avgStarRating}</p>
                <p>{spot.numReviews + " " + reviewPlural}</p>
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

    useEffect(() => {
        dispatch(spotActions.loadOneSpot(spotId));
        dispatch(reviewActions.loadAllReviews(spotId));
    }, [dispatch, spotId]);

    const ImageCard = ({ item }) => {
      // let main = {}
        return (
            <div className="detail-img" key={item.id}>
                <img className="detail-img " src={item.url} alt=""></img>
            </div>
        );
    };

    if (!spot.Owner) return null;

    return (
        <div className="page">
            <div>
                <h2>{spot.name}</h2>
                <p>{spot.city + ", " + spot.state + ", " + spot.country}</p>
            </div>

            <CardList type='detail' items={Object.values(spot.SpotImages)} CardRef={ImageCard} />

            <div>
                <div>
                    <h4>{"Hosted by " + spot.Owner.firstName}</h4>
                    <p>{spot.description}</p>
                </div>

                <ReserveButton
                    avgStarRating={spot.avgStarRating}
                    numReviews={spot.numReviews}
                    price={spot.price}
                ></ReserveButton>
            </div>

            {reviewTitle}

            {sessionUser &&
                sessionUser.id !== spot.ownerId &&
                !reviews.find((review) => review.userId === sessionUser.id) && (
                    // this is not cool
                    <ModalBtn type={"post_review"} spot={spot}></ModalBtn>
                )}

            {reviews.length > 0 ? <ReviewList reviews={reviews}></ReviewList> : <h6>Be the first to post a review!</h6>}

        </div>
    );
}

export default SpotPage;
