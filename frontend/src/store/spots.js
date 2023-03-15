// frontend/src/store/allSpots.js
import { csrfFetch } from './csrf';

const LOAD_ALL = 'spots/all';
const LOAD_ONE = 'spots/one'; // detail for one spot
const LOAD_CURRENT = 'spots/current'; // spots of current user
const CREATE_SPOT = 'spots/create';
const DELETE = 'spots/delete';
const CREATE_IMAGE = 'spots/create_image'


const loadAll = (spots) => {
  return {
    type: LOAD_ALL,
    payload: spots,
  };
};

const loadOne = (spot) => {
  return {
    type: LOAD_ONE,
    payload: spot
  };
};

const loadCurrent = (spots) => {
  return {
    type: LOAD_CURRENT,
    payload: spots
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot
  };
};

const deleteSpot = (spot) => {
  return {
    type: DELETE,
    payload: spot
  };
};

const createImage = (image) => {
  return {
    type: CREATE_IMAGE,
    payload: image
  };
};

const initialState = {
  allSpots: {},
  singleSpot: {
    Owner: {},
    SpotImages: []
  }
}


// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//       method: 'DELETE',
//     });
//     dispatch(removeUser());
//     return response;
//   };

// export const signup = (user) => async (dispatch) => {
//     const { username, firstName, lastName, email, password } = user;
//     const response = await csrfFetch("/api/users", {
//       method: "POST",
//       body: JSON.stringify({
//         username,
//         firstName,
//         lastName,
//         email,
//         password,
//       }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
//   };

// const initialState = { user: null };

// const allSpotsReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case SET_SPOT:
//       newState = Object.assign({}, state);
//       newState.user = action.payload;
//       return newState;
//     case REMOVE_SPOT:
//       newState = Object.assign({}, state);
//       newState.user = null;
//       return newState;
//     default:
//       return state;
//   }
// };

// export const restoreUser = () => async dispatch => {
//     const response = await csrfFetch('/api/session');
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
//   };

// export default allSpotsReducer;
