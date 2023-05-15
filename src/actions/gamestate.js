export const ADD_DICE_ROLL = 'ADD_DICE_ROLL';
export const CLEAR_DICE_ROLLS = 'CLEAR_DICE_ROLLS';

export const actionAddDiceRoll = (roll) => ({
  type: ADD_DICE_ROLL,
  payload: { roll }
});

export const actionClearDiceRolls = () => ({
  type: CLEAR_DICE_ROLLS,
});