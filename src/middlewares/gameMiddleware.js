import axios from "axios";
import { ADD_GALLERY_PICTURE, DELETE_GALLERY_PICTURE, GET_CURRENT_CHARACTER, GET_GAME_DATA, SAVE_CHARACTER, UPDATE_MAIN_PICTURE, actionGetCurrentCharacter, actionGetGameData, actionUpdateCurrentCharacter, actionUpdateGameData } from "../actions/gamestate";
import { actionAddError } from "../actions/user";

const gameMiddleware = (store) => (next) => async (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  switch (action.type) {
    case GET_GAME_DATA: {
      try {
        const gameId = action.payload;
        const { token } = store.getState().user;
        const { canSave } = store.getState().gamestate;
        const res = await axios.get(`${apiUrl}/api/games/${gameId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateGameData(res.data));
        
        // check if the currentCharacter is being modified
        if (!canSave) store.dispatch(actionGetCurrentCharacter(gameId));
      }
      catch (err) {
        store.dispatch(actionAddError("Erreur lors de la récupération de la partie."));
      }
      break;
    }

    case GET_CURRENT_CHARACTER: {
      try {
        const gameId = action.payload;
        const { token, user_id: userId } = store.getState().user;
        const { dm } =  store.getState().gamestate.game;

        // if the user the DM of the game, don't fetch the character
        if (dm.id === userId) {
          break;
        }
        
        const res = await axios.get(`${apiUrl}/api/users/${userId}/games/${gameId}/character`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        store.dispatch(actionUpdateCurrentCharacter(res.data));
      }
      catch (err) {
        store.dispatch(actionAddError("Erreur lors de la récupération du personnage."));
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
        store.dispatch(actionAddError("Erreur lors de l'enregistrement du personnage."));
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
        store.dispatch(actionAddError("Erreur lors du changement d'image principale."));
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
        store.dispatch(actionAddError("Erreur lors de l'ajout d'image à la gallerie."));
      }
      break;
    }

    case DELETE_GALLERY_PICTURE: {
      const { token } = store.getState().user;
      const gameId = store.getState().gamestate.game.id;

      try {
        await axios.delete(`${apiUrl}/api/galleries/${action.payload}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        store.dispatch(actionGetGameData(gameId));
      }
      catch (err) {
        store.dispatch(actionAddError("Erreur lors de la suppression de l'image."));
      }

      break;
    }

    default: break;
  }

  return next(action);
};

export default gameMiddleware;