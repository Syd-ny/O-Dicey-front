import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import GameHeader from "./GameHeader/GameHeader";
import GameMap from "./GameMap/GameMap";
import GameTabs from "./GameTabs/GameTabs";

import './Game.scss';
import PlayerAvatars from "./PlayerAvatars/PlayerAvatars";
import { useParams } from "react-router-dom";
import { actionGetCurrentCharacter, actionGetGameData } from "../../actions/gamestate";

const Game = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(actionGetGameData(gameId));
      dispatch(actionGetCurrentCharacter(gameId));
      firstRender.current = false;
    }
  }, [gameId, dispatch]);

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