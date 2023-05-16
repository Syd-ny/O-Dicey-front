import axios from "axios";
import { GET_CURRENT_CHARACTER, GET_GAME_DATA, SAVE_CHARACTER, actionUpdateCurrentCharacter, actionUpdateGameData } from "../actions/gamestate";

const gameMiddleware = (store) => (next) => async (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  switch (action.type) {
    case GET_GAME_DATA: {
      try {
        const gameId = action.payload;
        const { token } = store.getState().user;
        const res = await axios.get(`${apiUrl}/api/games/${gameId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateGameData(res.data));
      }
      catch (err) {
        console.error(err);
      }
      break;
    }

    case GET_CURRENT_CHARACTER: {
      try {
        const gameId = action.payload;
        const { token, user_id: userId } = store.getState().user;
        const res = await axios.get(`${apiUrl}/api/users/${userId}/games/${gameId}/character`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateCurrentCharacter(res.data));
      }
      catch (err) {
        console.error(err);
      }
      break;
    }

    case SAVE_CHARACTER: {
      try {
        const { token, user_id: userId } = store.getState().user;
        const character = store.getState().gamestate.currentCharacter;
        const gameId = store.getState().gamestate.game.id;
        const res = await axios.put(`${apiUrl}/api/characters/${character.id}`, 
        { ...character, user: { id: userId }, game: { id: gameId } }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateCurrentCharacter(res.data));
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

export default gameMiddleware;