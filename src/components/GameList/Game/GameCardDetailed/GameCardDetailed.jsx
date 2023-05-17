import PropTypes from 'prop-types';
import "./GameCardDetailed.scss";
import GameCard from "../GameCard/GameCard";
import CharacterCard from "../../../CharacterCard/CharacterCard";
import Dropdown from "../../../GameCreate/Dropdown/Dropdown";
import { useState } from "react";

const GameCardDetailed = ({
    title,
    createdAt,
    updatedAt,
    status,
    mobile,
}) => {

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
                    title={title}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    status={status} 
                />
                <p className="game-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum suscipit, quo sit iste blanditiis unde explicabo voluptatibus tenetur quaerat cupiditate nulla, veritatis rerum non animi laborum reprehenderit praesentium atque sed?</p>
                <div className="game-status">
                    <button className='classic'>Rejoindre</button>
                    <Dropdown
                        title="Statut"
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
    mobile: PropTypes.bool,
    };

export default GameCardDetailed;