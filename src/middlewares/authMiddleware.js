import axios from "axios";
import { CHECK_LOGIN, SUBMIT_LOGIN_FORM, USER_LOGOUT, actionAddError, actionUserLogin } from "../actions/user";

const authMiddleware = (store) => (next) => async (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  switch (action.type) {
    case SUBMIT_LOGIN_FORM: {
      try {
        const { email, password } = store.getState().user;
        const res = await axios.post(`${apiUrl}/api/login_check`, { username: email, password }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        // store the user info in localStorage to prevent getting disconnected on each page reload
        localStorage.setItem('user_info', JSON.stringify({
          id: res.data.data.id,
          login: res.data.data.login,
          token: res.data.token,
          admin: res.data.data.roles.includes("ROLE_ADMIN"),
        }));
        store.dispatch(actionUserLogin(res.data.data.login, res.data.token, res.data.data.id, res.data.data.roles.includes("ROLE_ADMIN")));
      }
      catch (err) {
        store.dispatch(actionAddError("Erreur lors de la connexion. Veuillez réessayer."));
      }
      break;
    }

    case CHECK_LOGIN: {
      // check if some userInfo is stored in localStorage
      if (localStorage.getItem('user_info') !== null) {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        store.dispatch(actionUserLogin(userInfo.login, userInfo.token, userInfo.id, userInfo.admin));
      }
      break;
    }

    case USER_LOGOUT: {
      // we clear the localStorage on logout
      localStorage.removeItem('user_info');
      break;
    }

    default: break;
  }

  return next(action);
}

export default authMiddleware;