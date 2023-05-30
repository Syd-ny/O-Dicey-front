import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import GameHeader from "./GameHeader/GameHeader";
import GameMap from "./GameMap/GameMap";
import GameTabs from "./GameTabs/GameTabs";

import './Game.scss';
import PlayerAvatars from "./PlayerAvatars/PlayerAvatars";
import { useParams } from "react-router-dom";
import { actionGetCurrentCharacter, actionGetGameData, actionUpdateCurrentCharacter } from "../../actions/gamestate";

const Game = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const firstRender = useRef(true);
  const refreshCurrentCharacter = useRef(false);
  const { game, currentCharacter, canSave } = useSelector((state) => state.gamestate);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(actionGetGameData(gameId));
      firstRender.current = false;
    }
  }, [gameId, dispatch]);

  // refresh game data every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(actionGetGameData(gameId));

      // flag set if the data was fetched from the API
      refreshCurrentCharacter.current = true;
    }, 5000);

    return () => clearInterval(timer);
  }, [game, gameId, dispatch]);

  // when game data is refreshed we need to update the displayed character
  useEffect(() => {
    // we check if the game data was indeed really updated from the API
    // if canSave is true the character is being edited by the user: do not update
    if (refreshCurrentCharacter.current && canSave === false) {
      // and we check which character was displayed if there was one
      // and we display it
      if (currentCharacter.id !== 0) {
        const displayedCharacter = game.characters.filter((c) => {
          return currentCharacter.id === c.id;
        });

        dispatch(actionUpdateCurrentCharacter(displayedCharacter[0]));
      }

      refreshCurrentCharacter.current = false;
    }
  }, [game, dispatch, currentCharacter]);

  return (
    <div className="game">
      <GameHeader />
      <div className="game-main">
        <PlayerAvatars />
        <GameMap />
        <GameTabs />
      </div>
    </div>
  );
};

export default Game;