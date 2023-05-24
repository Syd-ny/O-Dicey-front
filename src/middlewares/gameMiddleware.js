import axios from "axios";
import { ADD_GALLERY_PICTURE, GET_CURRENT_CHARACTER, GET_GAME_DATA, SAVE_CHARACTER, UPDATE_MAIN_PICTURE, actionGetGameData, actionUpdateCurrentCharacter, actionUpdateGameData } from "../actions/gamestate";

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
        const { token } = store.getState().user;
        const character = store.getState().gamestate.currentCharacter;
        const gameId = store.getState().gamestate.game.id;
        // if the DM is updating a player character, we need the user id to properly save the updated character
        // otherwise the DM 'steals' the character if it is saved with his own id
        const userCharacter = await axios.get(`${apiUrl}/api/characters/${character.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const { id: userId } = userCharacter.data.user;
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

    case UPDATE_MAIN_PICTURE: {
      const { token } = store.getState().user;
      const gameId = store.getState().gamestate.game.id;
      try {
        // Set the new image as main picture
        await axios.put(`${apiUrl}/api/galleries/${action.payload.newId}`,
          { main_picture: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

        // a game can have no main picture set
        if (action.payload.oldId !== 0) {
          // set main picture to 0 for the old image
          await axios.put(`${apiUrl}/api/galleries/${action.payload.oldId}`,
            { main_picture: 0 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
        }
        // we update game data
        store.dispatch(actionGetGameData(gameId));
      }
      catch (err) {
        console.log(err);
      }

      break;
    }

    case ADD_GALLERY_PICTURE: {
      const { token } = store.getState().user;
      const gameId = store.getState().gamestate.game.id;

      try {
        await axios.post(`${apiUrl}/api/galleries`, {
          picture: action.payload,
          game: {
            id: gameId,
          }
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionGetGameData(gameId));
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