import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { actionUserLogout } from '../../../actions/user';
import { Menu } from 'feather-icons-react/build/IconComponents';

const apiUrl = import.meta.env.VITE_API_URL;

const Dropdown = () => {
  const dispatch = useDispatch();

  const [isNavVisible, setIsNavVisible] = useState(false);
  const isLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) => state.user.admin);
  const pseudo = useSelector((state) => state.user.pseudo);

  const navClassName = isNavVisible ? 'header-dropdown-nav header-dropdown-nav-visible' : 'header-dropdown-nav';
  const titleClassName = isNavVisible ? 'header-dropdown-title header-dropdown-title-open' : 'header-dropdown-title';

  const handleLogout = () => {
    dispatch(actionUserLogout());
  }

  return (
    <div className="header-dropdown" onClick={() => { if (isLogged) setIsNavVisible(!isNavVisible) }}>
      {isLogged ? (
        <>
          <h2 className={titleClassName}>
            <span className="menu-desktop">{pseudo}</span>
            <span className="menu-mobile"><Menu /></span>
          </h2>
          <nav className={navClassName}>
            <Link to="/characters" className="header-dropdown-nav-site">Liste des personnages</Link>
            <Link to="/games" className="header-dropdown-nav-site">Liste des parties</Link>
            <Link to="/profile">Informations personnelles</Link>
            { isAdmin && <a href={`${apiUrl}/backoffice/login`}>Backoffice</a>}
            <Link to="/" onClick={handleLogout}>Déconnexion</Link>
          </nav>
        </>
      ) : <Link to="/login" className={titleClassName}>Login</Link>}
    </div>
  );
};

export default Dropdown;