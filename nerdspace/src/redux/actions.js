export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const updateProfile = update => ({
  type: UPDATE_PROFILE,
  payload: update
});

export const deleteProfile = () => ({
  type: DELETE_PROFILE
});

export const updateToken = update => ({
  type: UPDATE_TOKEN,
  payload: update
})

export const deleteToken = () => ({
  type: DELETE_TOKEN
});
