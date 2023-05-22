import PropTypes from 'prop-types';
import "./GameCard.scss";

const GameCard = ({
    game,
}) => {
    
    const Status = () => {
        if (game.status == 0) {
            return (
                <span className='game-status-ongoing'>En cours</span>
            )
        } else if (game.status == 1) {
            return (
                <span className='game-status-finished'>Terminée</span>
            )
        } else {
            return (
                <span className='game-status-inactive'>Inactive</span>
            )
        }
    }

    // transform date if != null
    var dateCreatedAt = ""
    if (game.createdAt != null) {
        dateCreatedAt = game.createdAt.split('T')[0]
    }

    var dateUpdatedAt = ""
    if (game.updatedAt != null) {
        dateUpdatedAt = game.updatedAt.split('T')[0]
    }
   

    return (
        <div className="gamecard">
            <img className="gamecard-img" src="https://i.imgur.com/i1m3wz0.png" alt="" />
            <div className="gamecard-information">
                <header className="gamecard-header">
                    <h3>{game.name}</h3>
                    <p>Maître du jeu : {game.dm.login}</p>
                </header>
                <div className="gamecard-footer">
                    <p>Créé le : {dateCreatedAt}</p>
                    <p>Dernière session : {dateUpdatedAt} </p>
                    <p>Status : <Status/></p>
                </div>
            </div>
        </div>
    );
};

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
  };

export default GameCard;