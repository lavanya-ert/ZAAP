import {ADD_PHOTO, DELETE_PHOTO, CLEAR_PHOTOS} from './Actions';

const initialState = {
  photos: [],
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.photo],
      };
    case DELETE_PHOTO:
      const updatedPhotos = [...state.photos];
      updatedPhotos.splice(action.index, 1);
      return {
        ...state,
        photos: updatedPhotos,
      };
    case CLEAR_PHOTOS:
      return {
        ...state,
        photos: [],
      };
    default:
      return state;
  }
};

export default photoReducer;
