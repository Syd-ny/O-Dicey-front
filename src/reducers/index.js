import { combineReducers } from "redux";

import userReducer from './user';
import gameStateReducer from './gamestate';

const rootReducer = combineReducers({
  user: userReducer,
  gamestate: gameStateReducer,
});

export default rootReducer;