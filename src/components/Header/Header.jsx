import './Header.scss';
import logo from '../../assets/ten-sided-dice.svg';
import Dropdown from './Dropdown/Dropdown';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} />
        <h1 className="header-title">
          <Link to="/">O'Dicey</Link>
        </h1>
      </div>
      <nav className="header-site-nav">
        <Link to="/characters">Liste des personnages</Link>
        <a href="#">Liste des parties</a>
      </nav>
      <Dropdown />
    </header>
  );
};

export default Header;