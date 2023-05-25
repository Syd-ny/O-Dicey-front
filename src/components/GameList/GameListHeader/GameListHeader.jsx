import "./GameListHeader.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const GameListHeader = (
    {
        searchValue,
        statusValue,
    }) => {

    const navigate = useNavigate();

    const [classOngoing, setClassOngoing] = useState("");
    const [classFinished, setClassFinished] = useState("");
    const toggleG = (value) => {
        if (value === classOngoing) {
            setClassOngoing("");
        } else {
            setClassOngoing(value);
            setClassFinished("");
        }
    }
    const toggleR = (value) => {
        if (value === classFinished) {
            setClassFinished("");
        } else {
            setClassFinished(value);
            setClassOngoing("");
        }
    }

    return (
        <div className="game-list-header">
            <div>
                <h2>Mes Parties</h2>
                <button onClick={() => navigate("/games/new")} className="classic">Nouvelle Partie</button>
            </div>
            <div>
                <div className="search-button">
                    <button className={classOngoing}
                        onClick={() => {
                            statusValue(0); 
                            toggleG("search-button-green");
                        }}>G</button>
                    <button className={classFinished} 
                        onClick={() => {
                            statusValue(1);
                            toggleR("search-button-red");
                        }}>R</button>
                </div>
                <input onChange={searchValue} type="search" name="party-search" id="party-search" placeholder="Rechercher une partie"></input>
                </div>
        </div>       
    )
}

export default GameListHeader;