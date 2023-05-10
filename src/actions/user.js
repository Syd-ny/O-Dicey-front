export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD';
export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';
export const USER_LOGIN = 'USER_LOGIN'; // login form submission OK, store the token and mark user as logged in
export const USER_LOGOUT = 'USER_LOGOUT';

export const actionUpdateFormField = (name, value) => ({
  type: UPDATE_FORM_FIELD,
  payload: { [name]: value },
});

export const actionSubmitLoginForm = () => ({
  type: SUBMIT_LOGIN_FORM,
});

export const actionUserLogin = (pseudo, token) => ({
  type: USER_LOGIN,
  payload: { pseudo, token },
});

export const actionUserLogout = () => ({
  type: USER_LOGOUT,
});