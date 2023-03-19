import React from "react";
import { useState } from "react";

function PostReviewForm({ spot }) {

    const [review, setReview] = useState("");

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
                  placeHolder="Leave your review here..."
                ></textarea>
            </div>

            <div>
                {/* stars */}
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
