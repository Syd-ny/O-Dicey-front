import { Link } from 'react-router-dom';
import logo from '../../../assets/ten-sided-dice.svg';
import exit from '../../../assets/exit-icon.svg';
import './GameHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionClearCurrentCharacter, actionClearGameData } from '../../../actions/gamestate';

const GameHeader = () => {
  const dispatch = useDispatch();
  const gameName = useSelector((state) => state.gamestate.game.name);

  const handleExit = () => {
    dispatch(actionClearGameData());
    dispatch(actionClearCurrentCharacter());
  };

  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} />
        <h1 className="header-title header-title-game">
          <Link to="/" onClick={handleExit}>O'Dicey</Link>
        </h1>
      </div>
      <div className="header-game-name"><h2>{gameName}</h2></div>
      <div className="header-game-exit">
        <Link to="/games" onClick={handleExit}><img src={exit} /></Link>
      </div>
    </header>
  );
};

export default GameHeader;