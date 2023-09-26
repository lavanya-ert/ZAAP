export const ADD_PHOTO = 'ADD_PHOTO';
export const DELETE_PHOTO = 'DELETE_PHOTO';
export const CLEAR_PHOTOS = 'CLEAR_PHOTOS';

export const addPhoto = photo => {
  return {type: ADD_PHOTO, photo};
};

export const deletePhoto = index => {
  return {type: DELETE_PHOTO, index};
};

export const clearPhotos = () => {
  return {type: CLEAR_PHOTOS};
};
