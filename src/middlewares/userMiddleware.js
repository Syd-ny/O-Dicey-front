import axios from "axios";
import { GET_CHARACTER_LIST, GET_GAME_LIST, actionUpdateCharacterList, actionUpdateGameList } from "../actions/user";

const userMiddleware = (store) => (next) => async (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token, user_id: userId } = store.getState().user;

  switch (action.type) {
    case GET_CHARACTER_LIST: {
      try {
        const res = await axios.get(`${apiUrl}/api/users/${userId}/characters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateCharacterList(res.data));
      }
      catch (err) {
        console.log(err);
      }

      break;
    }

    case GET_GAME_LIST: {
      try {
        const res = await axios.get(`${apiUrl}/api/users/${userId}/games`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateGameList(res.data));
      }
      catch (err) {
        console.log(err);
      }

      break;
    }

    default: break;
  }

  return next(action);
};

export default userMiddleware;