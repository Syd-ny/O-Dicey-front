import './Header.scss';
import logo from '../../assets/ten-sided-dice.svg';
import Dropdown from './Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const isLogged = useSelector((state) => state.user.logged);
  
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} />
        <h1 className="header-title">
          <Link to="/">O'Dicey</Link>
        </h1>
      </div>
      {isLogged && (
        <nav className="header-site-nav">
          <Link to="/characters">Liste des personnages</Link>
          <Link to="/games">Liste des parties</Link>
        </nav>
      )}
      <Dropdown />
    </header>
  );
};

export default Header;