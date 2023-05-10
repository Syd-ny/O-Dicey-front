import PropTypes from 'prop-types';
import "./GameCardDetailed.scss";
import GameCard from "../GameCard/GameCard";
import CharacterCard from "../../../CharacterCard/CharacterCard";




const GameCardDetailed = ({
    title,
    mobile,
}) => {
    const Gallery = () => {
        if ( mobile == undefined ) {
            return (
                <div className="gallery">
                    <CharacterCard/>
                    <CharacterCard/>
                    <CharacterCard/>
                    <CharacterCard/>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }

    return (
        <div className="gameDetailed">
            <div className="game-header">
                <GameCard
                    title={title} />
                <p className="game-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum suscipit, quo sit iste blanditiis unde explicabo voluptatibus tenetur quaerat cupiditate nulla, veritatis rerum non animi laborum reprehenderit praesentium atque sed?</p>
                <div className="game-status">
                    <button className='classic'>Rejoindre</button>
                    <form className='dropdown-status'>
                        <select name="status" id="status">
                            <option value="En cours">En cours</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Terminée">Terminée</option>
                        </select>
                    </form>
                </div>
            </div>
            <Gallery />
        </div>
    );
};

GameCardDetailed.propTypes = {
    title: PropTypes.string.isRequired,
    mobile: PropTypes.bool,
    };

export default GameCardDetailed;