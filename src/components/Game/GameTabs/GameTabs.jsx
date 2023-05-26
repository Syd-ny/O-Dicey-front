import { useState } from 'react';
import { useSelector } from 'react-redux';
import DiceRoller from '../DiceRoller/DiceRoller';
import GameMap from '../GameMap/GameMap';
import './GameTabs.scss';
import { isDMSelector } from '../../../selectors/gameSelectors';
import Notes from '../Notes/Notes';
import Inventory from '../Inventory/Inventory';
import { User, Users, FileText, ShoppingBag, Box, Map } from 'feather-icons-react/build/IconComponents';
import CharacterSheet from '../CharacterSheet/CharacterSheet';
import Gallery from '../Gallery/Gallery';
import Team from '../Team/Team';
import logo from '../../../assets/ten-sided-dice.svg';

const GameTabs = () => {
  const [currentTab, setCurrentTab] = useState("sheet"); // display character sheet by default
  const isDm = useSelector(isDMSelector);

  const changeTab = (event) => {
    event.preventDefault();
    setCurrentTab(event.currentTarget.dataset.screen);
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
              <span className="tab-icon"><User /></span>
            </a>
            <a href="#" className="player player-mobile" data-screen="team" onClick={changeTab}>
              <span className="tab-text">Coterie</span>
              <span className="tab-icon"><Users /></span>
            </a>
          </div>
          <div className="player-bottom">
            <a href="#" className="player" data-screen="notes" onClick={changeTab}>
              <span className="tab-text">Notes</span>
              <span className="tab-icon"><FileText /></span>
            </a>
            <a href="#" className="player" data-screen="inventory" onClick={changeTab}>
              <span className="tab-text">Inventaire</span>
              <span className="tab-icon"><ShoppingBag /></span>
            </a>
            <a href="#" className="player" data-screen="dice" onClick={changeTab}>
              <span className="tab-text">Lancé de dés</span>
              <span className="tab-icon"><img src={logo} width="60%" height="60%" /></span>
            </a>
          </div>

          {isDm && (<a href="#" className="dm" data-screen="gallery" onClick={changeTab}>
            <span className="tab-text">Galerie</span>
            <span className="tab-icon"><Map /></span>
          </a>)}
          
        </nav>
      </header>
      <div className="game-tabs-content">
        {currentTab === "map" && <GameMap />}
        {currentTab === "sheet" && <CharacterSheet />}
        {currentTab === "team" && <Team />}
        {currentTab === "notes" && <Notes />}
        {currentTab === "inventory" && <Inventory />}
        {currentTab === "dice" && <DiceRoller />}
        {currentTab === "gallery" && <Gallery />}
      </div>
    </div>
  );
};

export default GameTabs;