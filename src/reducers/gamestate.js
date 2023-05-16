import { ADD_DICE_ROLL, CLEAR_DICE_ROLLS, CLEAR_GAME_DATA, UPDATE_CURRENT_CHARACTER, UPDATE_GAME_DATA } from "../actions/gamestate";
import initialStats from '../types/character-stats';

const initialState = {
  currentCharacter: {
    id: 0,
    name: "",
    picture: "",
    stats: initialStats,
    game: {
      id: 0,
      name: ""
    }
  },
  diceRolls: [],
  game: {
    id: 0,
    name: "",
    characters: [],
    dm: {
      id: 0,
    }
  }
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_DICE_ROLL: {
      const newDiceRolls = [action.payload.roll, ...state.diceRolls];
      return { ...state, diceRolls: newDiceRolls };
    }

    case CLEAR_DICE_ROLLS: {
      return { ...state, diceRolls: [] };
    }

    case UPDATE_GAME_DATA: {
      return { ...state, game: action.payload };
    }

    case CLEAR_GAME_DATA: {
      return { ...state, game: initialState.game };
    }

    case UPDATE_CURRENT_CHARACTER: {
      return { ...state, currentCharacter: action.payload };
    }

    default: return state;
  }
};

export default reducer;