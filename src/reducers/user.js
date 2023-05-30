import { ADD_ERROR, POP_ERROR, UPDATE_CHARACTER_LIST, UPDATE_FORM_FIELD, UPDATE_GAME_LIST, USER_LOGIN, USER_LOGOUT } from "../actions/user";

export const initialState = {
  logged: false,
  email: '',
  pseudo: '',
  password: '',
  token: '',
  user_id: 0,
  characters: [],
  games: {
    player: [
      {
        id: 0,
        name: "",
        dm: {
          login: ""
        },
        characters: [],
      },
    ],
    DM: [
      {
        id: 0,
        name: "",
        dm: {
          login: ""
        },
        characters: [],
      },
    ],
  },
  errors: [],
  admin: false,
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
      // we keep the errors on logout in case there's something interesting
      return { ...initialState, errors: state.errors };
    }

    case UPDATE_CHARACTER_LIST: {
      return { ...state, characters: action.payload };
    }

    case UPDATE_GAME_LIST: {
      return { ...state, games: action.payload };
    }

    case ADD_ERROR: {
      return { ...state, errors: [...state.errors, action.payload] };
    }

    case POP_ERROR: {
      // we remove the first element of the array
      const newErrorList = state.errors.slice(1);
      return { ...state, errors: newErrorList };
    }

    default: return state;
  }
};

export default reducer;