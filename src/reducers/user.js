import { UPDATE_FORM_FIELD, USER_LOGIN, USER_LOGOUT } from "../actions/user";

export const initialState = {
  logged: false,
  email: '',
  pseudo: '',
  password: '',
  token: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_FORM_FIELD: {
      return { ...state, ...action.payload };
    }

    case USER_LOGIN: {
      return { ...state, ...action.payload, logged: true, email: '', password: '' };
    }

    case USER_LOGOUT: {
      return { ...state, logged: false, token: '' };
    }

    default: return state;
  }
};

export default reducer;