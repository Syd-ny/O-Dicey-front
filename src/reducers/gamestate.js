import { ADD_DICE_ROLL, CLEAR_DICE_ROLLS } from "../actions/gamestate";

const initialState = {
  diceRolls: [],
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case ADD_DICE_ROLL: {
      const newDiceRolls = [action.payload.roll, ...state.diceRolls];
      return {...state, diceRolls: newDiceRolls};
    }

    case CLEAR_DICE_ROLLS: {
      return {...state, diceRolls: []};
    }

    default: return state;
  }
};

export default reducer;