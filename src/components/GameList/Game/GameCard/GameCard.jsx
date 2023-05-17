import PropTypes from 'prop-types';
import "./GameCard.scss";

const GameCard = ({
    title,
    createdAt,
    updatedAt,
    status,
}) => {
    status = {status}
    const Status = () => {
        if (status == 0) {
            return (
                <span className='game-status-ongoing'>En cours</span>
            )
        } else if (status == 1) {
            return (
                <span className='game-status-finished'>Terminée</span>
            )
        } else {
            return (
                <span className='game-status-inactive'>Inactive</span>
            )
        }
    }

    return (
        <div className="gamecard">
            <img className="gamecard-img" src="https://i.imgur.com/i1m3wz0.png" alt="" />
            <div className="gamecard-information">
                <header className="gamecard-header">
                    <h3>{title}</h3>
                    <p>Maître du jeu : user</p>
                </header>
                <div className="gamecard-footer">
                    <p>Créé le : {createdAt}</p>
                    <p>Dernière session : {updatedAt}</p>
                    <p>Status : <Status></Status></p>
                </div>
            </div>
        </div>
    );
};

GameCard.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  };

export default GameCard;