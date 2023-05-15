import GameHeader from "./GameHeader/GameHeader";
import GameMap from "./GameMap/GameMap";
import GameTabs from "./GameTabs/GameTabs";

import './Game.scss';
import PlayerAvatars from "./PlayerAvatars/PlayerAvatars";

const Game = () => {
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