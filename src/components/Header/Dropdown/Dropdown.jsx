import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Dropdown.scss';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const isLogged = useSelector((state) => state.user.logged);
  const pseudo = useSelector((state) => state.user.pseudo);

  const navClassName = isNavVisible ? 'header-dropdown-nav header-dropdown-nav-visible' : 'header-dropdown-nav';
  const titleClassName = isNavVisible ? 'header-dropdown-title header-dropdown-title-open' : 'header-dropdown-title';
  return (
    <div className="header-dropdown">
      {isLogged ? (
        <>
          <h2 className={titleClassName} onClick={() => setIsNavVisible(!isNavVisible)}>{pseudo}</h2>
          <nav className={navClassName}>
            <a href="#" className="header-dropdown-nav-site">Liste des personnages</a>
            <a href="#" className="header-dropdown-nav-site">Liste des parties</a>
            <a href="#">Informations personnelles</a>
            <a href="#">Déconnexion</a>
          </nav>
        </>
      ) : <Link to="/login" className={titleClassName}>Login</Link>}
    </div>
  );
};

export default Dropdown;