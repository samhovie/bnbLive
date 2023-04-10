// frontend/src/store/allSpots.js
import { csrfFetch } from './csrf';
import normalize from '../utils';

const LOAD_ALL = 'spots/all';
const LOAD_ONE = 'spots/one';
const LOAD_CURRENT = 'spots/current';
const CREATE_SPOT = 'spots/create_spot';
const DELETE = 'spots/delete';
const UPDATE = 'spots/update';

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

const updateSpot = (spot) => {
  return {
    type: UPDATE,
    payload: spot
  };
};

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
  return dispatch(loadOne(data));
}

export const loadCurrentSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');
  const data = await response.json();
  return dispatch(loadCurrent(normalize(data.Spots)));
}

export const createOneSpot = (spot, images) => async (dispatch) => {
  // console.log(spot)
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
    const imageRes = await csrfFetch(`/api/spots/${spotData.id}/images`, {
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

export const deleteOneSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "DELETE"
  });
  return dispatch(deleteSpot(await response.json()));
}

export const updateOneSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  });
  return dispatch(updateSpot(await response.json()));
}

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL:
    case LOAD_CURRENT:
      newState.allSpots = { ...action.payload };
      return newState;
    case LOAD_ONE:
      newState.singleSpot = { ...action.payload };
      return newState;
    case CREATE_SPOT:
    case UPDATE:
      newState.allSpots[action.payload.id] = { ...action.payload };
      return newState;
    case DELETE:
      delete newState.allSpots[action.payload];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
