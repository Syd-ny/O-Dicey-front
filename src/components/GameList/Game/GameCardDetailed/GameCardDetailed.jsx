import PropTypes from 'prop-types';
import "./GameCardDetailed.scss";
import GameCard from "../GameCard/GameCard";
import Dropdown from "../../../GameCreate/Dropdown/Dropdown";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CharacterCardSmall from '../../../CharacterCard/CharacterCardSmall';

const GameCardDetailed = ({
    game,
    mobile,
}) => {

    const navigate = useNavigate();

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
            value: "ongoing",
            class: "green"
        },
        {
            name: "Inactive",
            value: "inactive",
            class: "orange"
        },
        {
            name: "Terminée",
            value: "finished",
            class: "red"
        }
    ]);

    const Gallery = () => {

        if ( mobile == undefined ) {
            return (
                <div className="gallery">
                    {game.characters.map((c, i) => <CharacterCardSmall key={`game-${i}`} 
                                name={c.name}
                                />)}
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
                    game={game}
                />
                <p className="game-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum suscipit, quo sit iste blanditiis unde explicabo voluptatibus tenetur quaerat cupiditate nulla, veritatis rerum non animi laborum reprehenderit praesentium atque sed?</p>
                <div className="game-status">
                    <button onClick={() => navigate(`/games/${game.id}`)} className='classic'>Rejoindre</button>
                    <Dropdown
                        title={gameStatusActive}
                        itemToList={gameStatus}
                    />
                </div>
            </div>
            <Gallery />
        </div>
    );
};

GameCardDetailed.propTypes = {
    game: PropTypes.object.isRequired,
    mobile: PropTypes.bool,
    };

export default GameCardDetailed;