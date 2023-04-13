import React, { useEffect } from "react";
import ReviewList from "./ReviewList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../store/spots";
import * as reviewActions from "../store/reviews";
import { ModalBtn } from "../App";
import ReserveButton from "./ReserveButton";

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

  if (!spot.Owner) return null;

  return (
    <div  className="page" >
      <div>
        <h2>{spot.name}</h2>
        <p>{spot.city + ", " + spot.state + ", " + spot.country}</p>
      </div>

      {/* <ImageGrid images={spot.SpotImages}></ImageGrid> */}

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

      <ReviewList reviews={reviews}></ReviewList>
    </div>
  );
}

export default SpotPage;
