import axios from "axios";
import { SUBMIT_LOGIN_FORM, actionUserLogin } from "../actions/user";

const authMiddleware = (store) => (next) => async (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  switch (action.type) {
    case SUBMIT_LOGIN_FORM: {
      try {
        const { email, password } = store.getState().user;
        const res = await axios.post(`${apiUrl}/api/login_check`, { username: email, password });
        console.log(res);
        store.dispatch(actionUserLogin(res.data.data.login, res.data.token));
      }
      catch (err) {
        // TODO: gérer les erreurs
        console.error(err);
      }
      break;
    }

    default: break;
  }

  return next(action);
}

export default authMiddleware;