import { ADD_DICE_ROLL, CLEAR_CURRENT_CHARACTER, CLEAR_DICE_ROLLS, CLEAR_GAME_DATA, SET_CAN_SAVE, UNSET_CAN_SAVE, UPDATE_CHARACTER_STATS, UPDATE_CURRENT_CHARACTER, UPDATE_GAME_DATA, UPDATE_INVENTORY, UPDATE_NOTES } from "../actions/gamestate";
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
    },
    notes: "",
    inventory: "",
  },
  diceRolls: [],
  game: {
    id: 0,
    name: "",
    characters: [],
    dm: {
      id: 0,
    },
    galleries: [],
  },
  canSave: false,
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

    case CLEAR_CURRENT_CHARACTER: {
      return { ...state, currentCharacter: initialState.currentCharacter };
    }

    case UPDATE_NOTES: {
      return { ...state, currentCharacter: { ...state.currentCharacter, notes: action.payload } };
    }

    case UPDATE_INVENTORY: {
      return { ...state, currentCharacter: { ...state.currentCharacter, inventory: action.payload } };
    }

    case UPDATE_CHARACTER_STATS: {
      return { ...state, currentCharacter: { ...state.currentCharacter, stats: action.payload } };
    }

    case SET_CAN_SAVE: {
      return { ...state, canSave: true };
    }

    case UNSET_CAN_SAVE: {
      return { ...state, canSave: false };
    }

    default: return state;
  }
};

export default reducer;