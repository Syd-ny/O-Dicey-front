import "./GameListHeader.scss";
import { useNavigate } from "react-router-dom";

const GameListHeader = () => {

    const navigate = useNavigate();

    return (
        <div className="game-list-header">
            <div>
                <h2>Mes Parties</h2>
                <button onClick={() => navigate("/games/new")} className="classic">Nouvelle Partie</button>
            </div>
            <input type="search" name="party-search" id="party-search" placeholder="Rechercher une partie"></input>
        </div>       
    )
}

export default GameListHeader;