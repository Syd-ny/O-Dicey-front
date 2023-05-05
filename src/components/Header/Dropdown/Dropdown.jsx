import './Dropdown.scss';

const Dropdown = () => {
  return (
    <div className="header-dropdown">
      <h2 className="header-dropdown-title">Pseudo</h2>
      <nav className="header-dropdown-nav">
        <a href="#">Informations personnelles</a>
        <a href="#">Déconnexion</a>
      </nav>
    </div>
  );
};

export default Dropdown;