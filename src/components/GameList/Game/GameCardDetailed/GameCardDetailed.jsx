import PropTypes from 'prop-types';
import "./GameCardDetailed.scss";
import GameCard from "../GameCard/GameCard";
import Dropdown from "../../../GameCreate/Dropdown/Dropdown";
import { useState } from "react";
import CharacterCardSmall from '../../../CharacterCard/CharacterCardSmall';

const GameCardDetailed = ({
    title,
    createdAt,
    updatedAt,
    status,
    dm,
    characters,
    mobile,
}) => {

    var gameStatusActive = ""
    if ( status == 0 ) {
        gameStatusActive = {
            name : "En cours",
            class: "green",
        }
    } else if ( status == 1 ) {
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
                    {characters.map((c, i) => <CharacterCardSmall key={`game-${i}`} 
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
                    title={title}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    status={status} 
                    dm={dm}
                />
                <p className="game-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum suscipit, quo sit iste blanditiis unde explicabo voluptatibus tenetur quaerat cupiditate nulla, veritatis rerum non animi laborum reprehenderit praesentium atque sed?</p>
                <div className="game-status">
                    <button className='classic'>Rejoindre</button>
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
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dm: PropTypes.string.isRequired,
    characters: PropTypes.array.isRequired,
    mobile: PropTypes.bool,
    };

export default GameCardDetailed;