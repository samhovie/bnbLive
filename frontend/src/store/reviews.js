import { csrfFetch } from './csrf';
import normalize from '../utils';

const REVIEWS = "reviews/all"
const CURRENT = "reviews/current"
const CREATE = "reviews/create"
const DELETE = "reviews/delete"

const initialState = {
    spot: {},
    user: {}
};

const loadAll = (reviews) => ({
    type: REVIEWS,
    payload: reviews,
});

const loadCurrent = (reviews) => ({
    type: CURRENT,
    payload: reviews,
});

const createReview = (review) => ({
    type: CREATE,
    payload: review
})

const deleteReview = (id) => ({
    type: DELETE,
    payload: id
})

export const loadAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    return dispatch(loadAll(normalize(data.Reviews)));
}

export const loadCurrentReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');
    const data = await response.json();
    return dispatch(loadCurrent(normalize(data.Reviews)));
}

export const createOneReview = (review, spotId) => async (dispatch) => {
    // console.log(review)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
    });

    const data = await response.json();
    console.log(data, response)

    return dispatch(createReview(data));
}

export const deleteOneReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    return dispatch(deleteReview(await response.json()));
}

const reviewsReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case REVIEWS:
            newState.spot = { ...action.payload };
            return newState
        case CURRENT:
            newState.user = { ...action.payload };
            return newState
        case CREATE:
            newState.spot[action.payload.id] = { ...action.payload };
            return newState
        case DELETE:
            delete newState.spot[action.payload]
            delete newState.user[action.payload]
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
