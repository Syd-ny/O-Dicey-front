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
                <div className="game-form-left">
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
                            <li>User 1 <span className="mj">MJ</span></li>
                            <li>User 2</li>
                            <li>User 3</li>
                            <li>User 4</li>
                        </ul>
                        <button className="game-form-button">Inviter des Joueurs</button>
                    </div>
                </div>


                <div className="game-form-right">
                    <div className="game-gallery-part">
                        <div className="game-gallery">
                            <img className="game-gallery-front" src="https://i.imgur.com/i1m3wz0.png" alt="" />
                            <div className="game-gallery-list">
                                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                                <img src="https://i.imgur.com/i1m3wz0.png" alt="" />
                            </div>
                        </div>
                        <h3>Envoyez votre image :</h3>
                        <label className="image-label" htmlFor="image">Parcourir</label>
                        <input className="image-input" type="file" id="image" name="image" accept=".jpg .jpeg .png" />
                    </div>
                    <button className="validate">Lancer la Partie</button>
                </div>

            </div>
        </div>

    )
}

export default GameCreate;