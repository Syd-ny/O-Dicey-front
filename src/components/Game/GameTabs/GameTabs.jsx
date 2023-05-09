import GameMap from '../GameMap/GameMap';
import './GameTabs.scss';

const GameTabs = () => {
  return (
    <div className="game-tabs">
      <header className="game-tabs-nav">
        <nav>
          <div className="player-top">
            <a href="#" className="player player-mobile">
              <span className="tab-text">Carte</span>
              <span className="tab-icon">C</span>
            </a>
            <a href="#" className="player">
              <span className="tab-text">Feuille de personnage</span>
              <span className="tab-icon">F</span>
            </a>
            <a href="#" className="player player-mobile">
              <span className="tab-text">Coterie</span>
              <span className="tab-icon">C</span>
            </a>
          </div>
          <div className="player-bottom">
            <a href="#" className="player">
            <span className="tab-text">Notes</span>
            <span className="tab-icon">N</span>
            </a>
            <a href="#" className="player">
            <span className="tab-text">Inventaire</span>
            <span className="tab-icon">I</span>
            </a>
            <a href="#" className="player">
            <span className="tab-text">Lancé de dés</span>
            <span className="tab-icon">D</span>
            </a>
          </div>
          <a href="#" className="dm">5</a>
        </nav>
      </header>
      <div className="game-tabs-content">
        <GameMap />
      </div>
    </div>
  );
};

export default GameTabs;