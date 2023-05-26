import "./GameListHeader.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Play } from "feather-icons-react/build/IconComponents";
import { Pause } from "feather-icons-react/build/IconComponents";

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
            setClassOngoing("black");
        } else {
            setClassOngoing(value);
            setClassFinished("black");
        }
    }
    const toggleR = (value) => {
        if (value === classFinished) {
            setClassFinished("black");
        } else {
            setClassFinished(value);
            setClassOngoing("black");
        }
    }

    return (
        <div className="game-list-header">
            <div className="game-list-header-part">
                <h2 className="game-list-header-h2">Mes Parties</h2>
                <button onClick={() => navigate("/games/new")} className="game-list-header-new">Nouvelle Partie</button>
            </div>
            <div className="game-list-header-part test">
                <div className="game-list-header-search-container">
                    <div className="game-list-header-icon-container">
                        <Play 
                            onClick={() => {
                                statusValue(0); 
                                toggleG("green");
                            }}
                            className="game-list-header-icon"
                            stroke={classOngoing}
                            fill={classOngoing}
                        >
                        </Play>
                    </div>
                    <div className="game-list-header-icon-container">
                        <Pause 
                             onClick={() => {
                                statusValue(1);
                                toggleR("red");
                            }}
                            className="game-list-header-icon"
                            stroke={classFinished}
                            fill={classFinished}
                        >
                        </Pause>
                    </div>
                </div>
                <input onChange={searchValue} type="search" name="party-search" className="game-list-header-search" placeholder="Rechercher une partie"></input>
            </div>
        </div>       
    )
}

export default GameListHeader;