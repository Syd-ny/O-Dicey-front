import { Link } from 'react-router-dom';
import logo from '../../../assets/ten-sided-dice.svg';
import exit from '../../../assets/exit-icon.svg';
import './GameHeader.scss';

const GameHeader = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} />
        <h1 className="header-title header-title-game">
          <Link to="/">O'Dicey</Link>
        </h1>
      </div>
      <div className="header-game-name"><h2>Nom de la partie</h2></div>
      <div className="header-game-exit">
        <Link to="/games"><img src={exit} /></Link>
      </div>
    </header>
  );
};

export default GameHeader;