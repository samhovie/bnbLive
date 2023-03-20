import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews'
import { useSelector } from "react-redux";
import Stars from './Stars';
// import { useHistory } from "react-router-dom";
// import { useContext } from "react";
import { useAModal } from "../../App";


function PostReviewForm({ spot }) {

    const [ review, setReview ] = useState("");
    const [ rating, setRating ] = useState(0);
    const [ disabled, setDisabled ] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // const [errors,setErrors] = useState({});
    // const history = useHistory();
    const { handleModal } = useAModal();
    // const reviews = Object.values(useSelector(state => state.reviews.spot));
    // const {modal, handleModal, modalContent} = useContext(ModalContext);



    useEffect(() => {
        setDisabled(rating <= 0 || review.length < 10)
    }, [ rating, review ])

    const onSubmit = async (e) => {
        e.preventDefault();

        // const response =
        dispatch(reviewActions.createOneReview({
            review,
            stars: rating
        }, spot.id, user));

        dispatch(reviewActions.loadAllReviews(spot.id))
        // const data = await response.json();
        // if (data && data.errors) setErrors(data.errors);
        // history.push(`/spots/${spot.id}`);

        handleModal();
        // console.log(modalContent)

        // return history.push(`/spots/${spot.id}`);

    }

    return (
        <form
        onSubmit={onSubmit}
        >
            <div>

                <div>
                    <h3>How was your stay?</h3>
                </div>

                <div>
                <textarea
                    name="review"
                    value={review}
                    onChange={e=>setReview(e.target.value)}
                    cols="25"
                    rows="5"
                    placeholder="Leave your review here..."
                    ></textarea>
                </div>

                <div>
                    <Stars
                    rating={rating}
                    setRating={setRating}
                    ></Stars>
                </div>

                <div>
                    <button
                    type="submit"
                    disabled={disabled}
                    > Submit Your Review
                    </button>
                </div>


            </div>
        </form>
    )

}

export default PostReviewForm;
