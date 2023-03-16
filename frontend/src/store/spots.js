// frontend/src/store/allSpots.js
import { csrfFetch } from './csrf';


// PUT IN UTILS FILE
const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});


const LOAD_ALL = 'spots/all';
const LOAD_ONE = 'spots/one'; // detail for one spot
// const UPDATE = 'spots/update'
// const LOAD_CURRENT = 'spots/current'; // spots of current user
const CREATE_SPOT = 'spots/create_spot';
// const DELETE = 'spots/delete';
// const CREATE_IMAGE = 'spots/create_image'


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

// const loadCurrent = (spots) => {
//   return {
//     type: LOAD_CURRENT,
//     payload: spots
//   };
// };

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot
  };
};

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

export const loadAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  return dispatch(loadAll(normalize(data.Spots)));
}

export const loadOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  return dispatch(loadOne(data))
}

                             // combine?
export const createOneSpot = (spot, images) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/`,
  {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(spot)
  });

  const spotData = await response.json();
  spotData.SpotImages = [];

  for (const image of images) {
    const imageRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(image)
    });
    spotData.SpotImages.push(await imageRes.json());
  }
  return dispatch(createSpot(spotData));
}






const spotsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD_ALL:
      newState.allSpots = { ...action.payload };
      return newState;
    case LOAD_ONE:
      newState.singleSpot = { ...action.payload };
      return newState;
    // case LOAD_CURRENT:
    //   // newState = Object.assign({}, state);
    //   // newState.user = null;
    //   return newState;
    case CREATE_SPOT:
      newState[action.payload.id] = { ...action.payload };
      return newState;
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
