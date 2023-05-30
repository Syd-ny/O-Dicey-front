import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2023 O'Dicey</p>
      <nav className="footer-nav">
        <Link to="/contact">Contact</Link>
        <Link to="/legal">Mentions légales</Link>
      </nav>
    </footer>
  );
};

export default Footer;