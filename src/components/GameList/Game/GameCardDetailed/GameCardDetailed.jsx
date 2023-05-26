import PropTypes from 'prop-types';
import "./GameCardDetailed.scss";
import GameCard from "../GameCard/GameCard";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CharacterCardSmall from '../../../CharacterCard/CharacterCardSmall';

const GameCardDetailed = ({
    game,
    mobile,
}) => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user)


    var gameStatusActive = ""
    if ( game.status == 0 ) {
        gameStatusActive = {
            name : "En cours",
            class: "green",
        }
    } else if ( game.status == 1 ) {
        gameStatusActive = {
            name : "Terminée",
            class: "red",
        }
    } else {
        gameStatusActive = {
            name : "Inactive",
            class: "orange",
        }
    }


    const gameStatus = useState([
        {
            name: "En cours",
            id: "ongoing",
            class: "green"
        },
        {
            name: "Inactive",
            id: "inactive",
            class: "orange"
        },
        {
            name: "Terminée",
            id: "finished",
            class: "red"
        }
    ]);

    const Gallery = () => {

        if ( mobile == undefined ) {
            return (
                <div className="gamecard-detailed-gallery">
                    {game.characters.map((c, i) => 
                        <CharacterCardSmall key={`character-${i}`} 
                            name={c.name}
                            character={c}
                        />
                    )}
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }

    return (
        <div className="gamecard-detailed">
            <div className="gamecard-detailed-info-container">
                <GameCard
                    game={game}
                />
                <p className="gamecard-detailed-description"></p>

                <div className="gamecard-detailed-status">
                    <button 
                        className="gamecard-detailed-button" 
                        onClick={() => navigate(`/games/${game.id}`)}
                    >
                        Rejoindre
                    </button>
                    {game.dm.id === user.user_id && <button className="gamecard-detailed-button" onClick={() => navigate(`/games/${game.id}/edit`)}>Modifier</button>}
                </div>
            </div>
            {game.characters.length !== 0 && <Gallery />}
        </div>
    );
};

GameCardDetailed.propTypes = {
    game: PropTypes.object.isRequired,
    mobile: PropTypes.bool,
    };

export default GameCardDetailed;