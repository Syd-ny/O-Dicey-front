import PropTypes from 'prop-types';
import "./GameCard.scss"

const GameCard = ({
    title,
}) => {
    return (
        <div className="card">
            <img className="card-img" src="https://i.imgur.com/i1m3wz0.png" alt="" />
            <div className="card-information">
                <header className="card-header">
                    <h3>Nom de la partie {title}</h3>
                    <p>Maître du jeu : user</p>
                </header>
                <div className="card-footer">
                    <p>Créé le : xx/xx/xxxx</p>
                    <p>Dernière session : xx/xx/xxxx</p>
                    <p>Status : En cours</p>
                </div>
            </div>
        </div>
    );
};

GameCard.propTypes = {
    title: PropTypes.string.isRequired,
  };

export default GameCard;