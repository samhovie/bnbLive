import { csrfFetch } from './csrf';
import normalize from '../utils';

const REVIEWS = "reviews/all"
const CURRENT = "reviews/current"
// const CREATE = "reviews/create"
// const DELETE = "reviews/delete"

const initialState = {
    spot: {},
    user: {}
};

const loadAll = (reviews) => ({
    type: REVIEWS,
    payload: reviews,
});

// const loadCurrent = (reviews) => ({
//     type: CURRENT,
//     payload: reviews,
// });

export const loadAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    return dispatch(loadAll(normalize(data.Reviews)));
}

export const loadCurrentReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');
    const data = await response.json();
    return dispatch(loadAll(normalize(data.Reviews)));
}

const reviewsReducer = (state = initialState, action) => {
    const newState = { ...state, spot:{ ...state.spot }};
    switch (action.type) {
        case REVIEWS:
            newState.spot = { ...action.payload };
            return newState
        case CURRENT:
            newState.spot = { ...action.payload };
            return newState
        default:
            return state;
    }

}

export default reviewsReducer;
