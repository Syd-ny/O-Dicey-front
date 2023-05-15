export const ADD_DICE_ROLL = 'ADD_DICE_ROLL';

export const actionAddDiceRoll = (roll) => ({
  type: ADD_DICE_ROLL,
  payload: { roll }
});