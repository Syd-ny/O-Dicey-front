export const ADD_DICE_ROLL = 'ADD_DICE_ROLL';
export const CLEAR_DICE_ROLLS = 'CLEAR_DICE_ROLLS';
export const GET_GAME_DATA = 'GET_GAME_DATA';
export const UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';
export const CLEAR_GAME_DATA = 'CLEAR_GAME_DATA';
export const GET_CURRENT_CHARACTER = 'GET_CURRENT_CHARACTER';
export const UPDATE_CURRENT_CHARACTER = 'UPDATE_CURRENT_CHARACTER';
export const CLEAR_CURRENT_CHARACTER = 'CLEAR_CURRENT_CHARACTER';
export const UPDATE_NOTES = 'UPDATE_NOTES';
export const SAVE_CHARACTER = 'SAVE_CHARACTER';

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

export const actionSaveCharacter = () => ({
  type: SAVE_CHARACTER,
});