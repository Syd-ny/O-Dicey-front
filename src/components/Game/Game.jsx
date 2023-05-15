import GameHeader from "./GameHeader/GameHeader";
import GameMap from "./GameMap/GameMap";
import GameTabs from "./GameTabs/GameTabs";

import './Game.scss';

const Game = () => {
  return (
    <div className="game">
      <GameHeader />
      <div className="game-main">
        <GameMap />
        <GameTabs />
      </div>
    </div>
  );
};

export default Game;