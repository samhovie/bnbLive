import React from "react";
import { useState, useEffect } from "react";
import Stars from './Stars';







function PostReviewForm({ spot }) {

    const [ review, setReview ] = useState("");
    const [ rating, setRating ] = useState(0);

    useEffect(() => {
        console.log(rating)
    }, [rating])


    return (
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
                id="button"
                disabled={true}
                > Submit Your Review
                </button>
            </div>


        </div>
    )
}

export default PostReviewForm;
