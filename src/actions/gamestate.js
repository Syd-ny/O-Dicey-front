export const ADD_DICE_ROLL = 'ADD_DICE_ROLL';
export const CLEAR_DICE_ROLLS = 'CLEAR_DICE_ROLLS';
export const GET_GAME_DATA = 'GET_GAME_DATA';
export const UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';
export const CLEAR_GAME_DATA = 'CLEAR_GAME_DATA';
export const GET_CURRENT_CHARACTER = 'GET_CURRENT_CHARACTER';
export const UPDATE_CURRENT_CHARACTER = 'UPDATE_CURRENT_CHARACTER';
export const CLEAR_CURRENT_CHARACTER = 'CLEAR_CURRENT_CHARACTER';
export const UPDATE_NOTES = 'UPDATE_NOTES';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
export const SAVE_CHARACTER = 'SAVE_CHARACTER';
export const UPDATE_MAIN_PICTURE = 'UPDATE_MAIN_PICTURE';
export const ADD_GALLERY_PICTURE = 'ADD_GALLERY_PICTURE';
export const DELETE_GALLERY_PICTURE = 'DELETE_GALLERY_PICTURE';
export const UPDATE_CHARACTER_STATS = 'UPDATE_CHARACTER_STATS';
export const SET_CAN_SAVE = 'SET_CAN_SAVE';
export const UNSET_CAN_SAVE = 'UNSET_CAN_SAVE';

export const actionAddDiceRoll = (roll) => ({
  type: ADD_DICE_ROLL,
  payload: { roll }
});

export const actionClearDiceRolls = () => ({
  type: CLEAR_DICE_ROLLS,
});

export const actionGetGameData = (gameId) => ({
  type: GET_GAME_DATA,
  payload: gameId,
});

export const actionUpdateGameData = (gameData) => ({
  type: UPDATE_GAME_DATA,
  payload: gameData,
});

export const actionClearGameData = () => ({
  type: CLEAR_GAME_DATA,
});

/**
 * Get the current user's character for the current game 
 */
export const actionGetCurrentCharacter = (gameId) => ({
  type: GET_CURRENT_CHARACTER,
  payload: gameId,
});

export const actionUpdateCurrentCharacter = (character) => ({
  type: UPDATE_CURRENT_CHARACTER,
  payload: character,
});

export const actionClearCurrentCharacter = () => ({
  type: CLEAR_CURRENT_CHARACTER,
});

export const actionUpdateNotes = (text) => ({
  type: UPDATE_NOTES,
  payload: text,
});

export const actionUpdateInventory = (text) => ({
  type: UPDATE_INVENTORY,
  payload: text,
});

export const actionSaveCharacter = () => ({
  type: SAVE_CHARACTER,
});

export const actionUpdateMainPicture = (oldId, newId) => ({
  type: UPDATE_MAIN_PICTURE,
  payload: { oldId, newId },
});

export const actionAddGalleryPicture = (url) => ({
  type: ADD_GALLERY_PICTURE,
  payload: url,
});

export const actionDeleteGalleryPicture = (id) => ({
  type: DELETE_GALLERY_PICTURE,
  payload: id,
});

export const actionUpdateCharacterStats = (stats) => ({
  type: UPDATE_CHARACTER_STATS,
  payload: stats,
});

export const actionSetCanSave = () => ({
  type: SET_CAN_SAVE,
});

export const actionUnsetCanSave = () => ({
  type: UNSET_CAN_SAVE,
});