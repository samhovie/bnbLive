import React from "react";
import { useAModal } from "../../App";
import { useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews'
import { loadOneSpot } from "../../store/spots";

function DeleteReviewForm({ review }) {
    const {handleModal} = useAModal();
    const dispatch = useDispatch();
    return (
        <div>

            <div>
                <h3>Confirm Delete</h3>
            </div>

            <div>
                <p>Are you sure you want to remove this review?</p>
            </div>

            <div>
            <button
                type="submit"
                id="yesDelRevBtn"
                // disabled={}
                onClick={(e) => {
                    dispatch(reviewActions.deleteOneReview(review.id))
                    dispatch(reviewActions.loadAllReviews(review.spotId));
                    dispatch(loadOneSpot(review.spotId))
                    handleModal();
                }}
                > Yes &#40;Delete Review&#41;
                </button>
            </div>
            <div>
                <button
                type="submit"
                id="noDelRevBtn"
                // disabled={true}
                onClick={(e) => {
                    e.preventDefault();
                    handleModal();

                }}
                > No &#40;Keep Review&#41;
                </button>
            </div>



        </div>
    )
}
export default DeleteReviewForm;
