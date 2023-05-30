import PropTypes from 'prop-types';
import "./GameCard.scss";
import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const GameCard = ({
    game,
}) => {
    
    const Status = () => {
        if (game.status == 0) {
            return (
                <span className='game-status-ongoing'>En cours</span>
            )
        } else if (game.status == 1) {
            return (
                <span className='game-status-finished'>Terminée</span>
            )
        } else {
            return (
                <span className='game-status-inactive'>Inactive</span>
            )
        }
    }

    // transform date if != null
    var dateCreatedAt = ""
    if (game.createdAt != null) {
        dateCreatedAt = game.createdAt.split('T')[0]
    }

    var dateUpdatedAt = ""
    if (game.updatedAt != null) {
        dateUpdatedAt = game.updatedAt.split('T')[0]
    }
   

    const apiUrl = import.meta.env.VITE_API_URL
    const userToken = useSelector((state) => state.user.token);
    const [urlsList, setUrlsList] = useState([]);

    const fetchUsers = useCallback( async () => {
        // axios => get data (game data) 
        await axios.get(
            `api/games/${game.id}/galleries`,
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
                },
            }
        ).then((response) => {
            for (let index = 0; index < response.data.length; index++) {
                if (response.data[index].mainPicture === 1) {
                    setUrlsList(...urlsList, response.data[index]);
                }
            }
        })
    }, [userToken, apiUrl, game, urlsList]);
    
    // do it when new render
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            fetchUsers();
            firstRender.current = false;
        } 
    }, [fetchUsers]);






    return (
        <div className="gamecard">
            <img
                className="gamecard-img"
                src={
                    urlsList.length !== 0
                        ? urlsList.picture
                        : "https://i.imgur.com/i1m3wz0.png"
                    }
                alt=""
            />
            <div className="gamecard-info">
                <header className="gamecard-info-header">
                    <h3 className="gamecard-info-header-h3">{game.name}</h3>
                    <p>Maître du jeu : {game.dm.login}</p>
                </header>
                <div className="gamecard-info-footer">
                    <p>Créé le : {dateCreatedAt}</p>
                    <p>Dernière session : {dateUpdatedAt} </p>
                    <p>Status : <Status/></p>
                </div>
            </div>
        </div>
    );
};

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
  };

export default GameCard;