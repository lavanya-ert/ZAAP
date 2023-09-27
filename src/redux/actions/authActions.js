export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = userEmail => ({
  type: LOGIN_USER,
  payload: userEmail,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
