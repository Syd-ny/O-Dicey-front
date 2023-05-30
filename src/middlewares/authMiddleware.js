import axios from "axios";
import { SUBMIT_LOGIN_FORM, actionAddError, actionUserLogin } from "../actions/user";

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
        store.dispatch(actionUserLogin(res.data.data.login, res.data.token, res.data.data.id));
      }
      catch (err) {
        store.dispatch(actionAddError("Erreur lors de la connexion. Veuillez réessayer."));
      }
      break;
    }

    default: break;
  }

  return next(action);
}

export default authMiddleware;