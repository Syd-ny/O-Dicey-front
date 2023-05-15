import { ADD_DICE_ROLL } from "../actions/gamestate";

const initialState = {
  diceRolls: [],
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case ADD_DICE_ROLL: {
      const newDiceRolls = [action.payload.roll, ...state.diceRolls];
      return {...state, diceRolls: newDiceRolls};
    }

    default: return state;
  }
};

export default reducer;