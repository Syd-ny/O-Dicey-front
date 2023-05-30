export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD';
export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';
export const USER_LOGIN = 'USER_LOGIN'; // login form submission OK, store the token and mark user as logged in
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_CHARACTER_LIST = 'GET_CHARACTER_LIST';
export const UPDATE_CHARACTER_LIST = 'UPDATE_CHARACTER_LIST';
export const GET_GAME_LIST = 'GET_GAME_LIST';
export const UPDATE_GAME_LIST = 'UPDATE_GAME_LIST';
export const ADD_ERROR = 'ADD_ERROR';
export const POP_ERROR = 'POP_ERROR'; // remove the oldest error from the error list
export const CHECK_LOGIN = 'CHECK_LOGIN'; // action to check if the user is already connected

export const actionUpdateFormField = (name, value) => ({
  type: UPDATE_FORM_FIELD,
  payload: { [name]: value },
});

export const actionSubmitLoginForm = () => ({
  type: SUBMIT_LOGIN_FORM,
});

export const actionUserLogin = (pseudo, token, id, admin) => ({
  type: USER_LOGIN,
  payload: { pseudo, token, user_id: id, admin },
});

export const actionUserLogout = () => ({
  type: USER_LOGOUT,
});

export const actionGetCharacterList = () => ({
  type: GET_CHARACTER_LIST
});

export const actionUpdateCharacterList = (list) => ({
  type: UPDATE_CHARACTER_LIST,
  payload: list,
});

export const actionGetGameList = () => ({
  type: GET_GAME_LIST,
});

export const actionUpdateGameList = (list) => ({
  type: UPDATE_GAME_LIST,
  payload: list,
});

export const actionAddError = (error) => ({
  type: ADD_ERROR,
  payload: error,
});

export const actionPopError = () => ({
  type: POP_ERROR,
});

export const actionCheckLogin = () => ({
  type: CHECK_LOGIN,
});