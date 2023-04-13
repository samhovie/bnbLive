import React from 'react';
import { useSelector } from 'react-redux';
import { ModalBtn } from "../App";


function ReviewCard({ review }) {

    const sessionUser = useSelector(state => state.session.user);
    if (!review.User) return null;

    const monthArr = ['January', 'February', 'March',
                      'April', 'May', 'June', 'July',
                      'August', 'September', 'October',
                      'November', 'December'];

    const date = new Date(review.createdAt);
    const month = monthArr[date.getMonth() - 1];
    const year = date.getFullYear();

    return (
        <div>
            <h4>{review.User.firstName}</h4>
            <h5>{month + ' ' + year}</h5>
            <p>{review.review}</p>
            { sessionUser && review.userId === sessionUser.id &&
            (
                <ModalBtn type='delete_review' review={review}/>
            )
          }
        </div>
    );

}

export default ReviewCard;
