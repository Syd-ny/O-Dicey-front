import './Header.scss';
import logo from '../../assets/ten-sided-dice.svg';
import Dropdown from './Dropdown/Dropdown';

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} />
        <h1 className="header-title">O'Dicey</h1>
      </div>
      <Dropdown />
    </header>
  );
};

export default Header;