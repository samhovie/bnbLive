// frontend/src/store/allSpots.js
import { csrfFetch } from './csrf';


// PUT IN UTILS FILE
const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});


const LOAD_ALL = 'spots/all';
// const LOAD_ONE = 'spots/one'; // detail for one spot
// const LOAD_CURRENT = 'spots/current'; // spots of current user
// const CREATE_SPOT = 'spots/create';
// const DELETE = 'spots/delete';
// const CREATE_IMAGE = 'spots/create_image'


const loadAll = (spots) => {
  return {
    type: LOAD_ALL,
    payload: spots,
  };
};

// const loadOne = (spot) => {
//   return {
//     type: LOAD_ONE,
//     payload: spot
//   };
// };

// const loadCurrent = (spots) => {
//   return {
//     type: LOAD_CURRENT,
//     payload: spots
//   };
// };

// const createSpot = (spot) => {
//   return {
//     type: CREATE_SPOT,
//     payload: spot
//   };
// };

// const deleteSpot = (spot) => {
//   return {
//     type: DELETE,
//     payload: spot
//   };
// };

// const createImage = (image) => {
//   return {
//     type: CREATE_IMAGE,
//     payload: image
//   };
// };

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

export const loadAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  return dispatch(loadAll(normalize(data.Spots)))
}




const spotsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD_ALL:
      newState.allSpots = { ...action.payload };
      return newState;
    // case LOAD_ONE:
    //   // newState = Object.assign({}, state);
    //   // newState.user = null;
    //   return newState;
    // case LOAD_CURRENT:
    //   // newState = Object.assign({}, state);
    //   // newState.user = null;
    //   return newState;
    // case CREATE_SPOT:
    //   // newState = Object.assign({}, state);
    //   // newState.user = action.payload;
    //   return newState;
    // case DELETE:
    //   // newState = Object.assign({}, state);
    //   // newState.user = null;
    //   return newState;
    // case CREATE_IMAGE:
    //   // newState = Object.assign({}, state);
    //   // newState.user = null;
    //   return newState;
    default:
      return state;
  }
};

export default spotsReducer;
