import { useState } from "react";
import "./GameCreate.scss";
import Dropdown from "./Dropdown/Dropdown";

const GameCreate = () => {


    const gameMode = useState([
        {
            name: "Dungeons & Dragons",
            value: "d&d"
        },
        {
            name: "Warhammer",
            value: "warhammer"
        }
    ]);

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
            value: "finish",
            class: "red"
        }
    ]);

    // console.log(itemsList);
    return (
        <div className="game-create">
            <h2>Créer ma partie</h2>

            <div className="game-form">
                <div className="game-form-part">
                    <label htmlFor="game-name">Nom de la Partie :</label>
                    <input type="text" id="game-name" placeholder="Nom de la Partie" />
                </div>
                
                <div className="game-form-part">
                    <label htmlFor="game-mode">Système de Jeu :</label>
                    <Dropdown
                        title="Mode"
                        itemToList={gameMode}
                    />
                </div>

                <div className="game-form-part">
                    <label htmlFor="game-status">Statut de la Partie :</label>
                    <Dropdown
                        title="Statut"
                        itemToList={gameStatus}
                    />
                </div>

                <div className="game-form-part">
                    <h3>Liste des Joueurs :</h3>
                    <ul>
                        <li></li>
                    </ul>
                    <button className="send-invite">Inviter des Joueurs</button>
                </div>
                <button className="validate">Lancer la Partie</button>
            </div>
        </div>

    )
}

export default GameCreate;