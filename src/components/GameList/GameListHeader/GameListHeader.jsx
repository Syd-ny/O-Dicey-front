import "./GameListHeader.scss";

const GameListHeader = () => {
    return (
        <div className="game-list-header">
            <div>
                <h2>Mes Parties</h2>
                <button className="classic">Nouvelle Partie</button>
            </div>
            <input type="search" name="party-search" id="party-search" placeholder="Rechercher une partie"></input>
        </div>       
    )
}

export default GameListHeader;