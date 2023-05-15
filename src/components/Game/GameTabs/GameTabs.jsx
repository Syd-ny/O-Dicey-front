import { useState } from 'react';
import DiceRoller from '../DiceRoller/DiceRoller';
import GameMap from '../GameMap/GameMap';
import './GameTabs.scss';

const GameTabs = () => {
  const [currentTab, setCurrentTab] = useState("sheet"); // display character sheet by default

  const changeTab = (event) => {
    event.preventDefault();
    setCurrentTab(event.target.dataset.screen);
  };

  return (
    <div className="game-tabs">
      <header className="game-tabs-nav">
        <nav>
          <div className="player-top">
            <a href="#" className="player player-mobile" data-screen="map" onClick={changeTab}>
              <span className="tab-text">Carte</span>
              <span className="tab-icon">C</span>
            </a>
            <a href="#" className="player" data-screen="sheet" onClick={changeTab}>
              <span className="tab-text">Feuille de personnage</span>
              <span className="tab-icon">F</span>
            </a>
            <a href="#" className="player player-mobile" data-screen="team" onClick={changeTab}>
              <span className="tab-text">Coterie</span>
              <span className="tab-icon">C</span>
            </a>
          </div>
          <div className="player-bottom">
            <a href="#" className="player" data-screen="notes" onClick={changeTab}>
              <span className="tab-text">Notes</span>
              <span className="tab-icon">N</span>
            </a>
            <a href="#" className="player" data-screen="inventory" onClick={changeTab}>
              <span className="tab-text">Inventaire</span>
              <span className="tab-icon">I</span>
            </a>
            <a href="#" className="player" data-screen="dice" onClick={changeTab}>
              <span className="tab-text">Lancé de dés</span>
              <span className="tab-icon">D</span>
            </a>
          </div>
          <a href="#" className="dm" data-screen="gallery" onClick={changeTab}>
            <span className="tab-text">Galerie</span>
            <span className="tab-icon">G</span>
          </a>
        </nav>
      </header>
      <div className="game-tabs-content">
        {currentTab === "map" && <GameMap />}
        {currentTab === "sheet" && <p>Feuille de perso</p>}
        {currentTab === "team" && <p>Coterie</p>}
        {currentTab === "notes" && <p>Notes</p>}
        {currentTab === "inventory" && <p>Inventaire</p>}
        {currentTab === "dice" && <DiceRoller />}
        {currentTab === "gallery" && <p>Galerie</p>}
      </div>
    </div>
  );
};

export default GameTabs;