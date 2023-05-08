import { useState } from 'react';
import './Dropdown.scss';

const Dropdown = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navClassName = isNavVisible ? 'header-dropdown-nav header-dropdown-nav-visible' : 'header-dropdown-nav';
  const titleClassName = isNavVisible ? 'header-dropdown-title header-dropdown-title-open' : 'header-dropdown-title';
  return (
    <div className="header-dropdown">
      <h2 className={titleClassName} onClick={() => setIsNavVisible(!isNavVisible)}>Pseudo</h2>
      <nav className={navClassName}>
        <a href="#" className="header-dropdown-nav-site">Liste des personnages</a>
        <a href="#" className="header-dropdown-nav-site">Liste des parties</a>
        <a href="#">Informations personnelles</a>
        <a href="#">Déconnexion</a>
      </nav>
    </div>
  );
};

export default Dropdown;