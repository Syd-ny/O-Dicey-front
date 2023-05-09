import PropTypes from 'prop-types';
import "./GameCardDetailed.scss"
import GameCard from "../GameCard/GameCard"

const GameCardDetailed = ({
    title,
}) => {
    return (
        <div className="gameDetailed">
          <div className="game-header">
            <GameCard
                    title={title} />
            <p className="game-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum suscipit, quo sit iste blanditiis unde explicabo voluptatibus tenetur quaerat cupiditate nulla, veritatis rerum non animi laborum reprehenderit praesentium atque sed?</p>
            <div className="game-status">
              <button>Rejoindre</button>
            </div>
          </div>
            <div className="gallery">
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
            </div>
        </div>
    );
};

GameCardDetailed.propTypes = {
    title: PropTypes.string.isRequired,
    };

export default GameCardDetailed;