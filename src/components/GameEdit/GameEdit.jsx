import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./GameEdit.scss";
import Dropdown from "../GameCreate/Dropdown/Dropdown";
import PageWrapper from "../PageWrapper/PageWrapper";
import { Cpu } from "feather-icons-react/build/IconComponents";

const GameEdit = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const location = useLocation();
    const gameId = location.pathname.split("/")[2]

    const userToken = useSelector((state) => state.user.token);
    const apiUrl = import.meta.env.VITE_API_URL

    const [gameCreateError, setGameCreateError] = useState([""]);
    const [playerInviteError, setPlayerInviteError] = useState([""]);
    const [urlGalleryError, setUrlGalleryError] = useState([""]);


    const gameStatus = [
        {
            name: "En cours",
            id: 0,
            class: "green"
        },
        {
            name: "Terminée",
            id: 1,
            class: "red"
        }
    ];

    // Dropdown title
    const mode = {
        name : "Mode",
    }
    const status = {
        name : "Statut",
    }

    // Update Status in Form
    const updateStatusForm = (value) => {
        setGameUpdateForm({...gameUpdateForm, status: value});
    }

    // Update Mode in Form
    const updateModeForm = (value) => {
        setGameUpdateForm({...gameUpdateForm, mode: value});
    }


    const handleSignUpChangeField = (event) => {
        if (gameCreateError.length > 0) setGameCreateError([]); // bad error handling
        setGameUpdateForm({...gameUpdateForm, name: event.target.value});
    };
    


    // =====================
    // ===== SEND FORM =====
    // =====================

    const submitGameCreateForm = async () => {
        // axios send Form
        try {
            await axios.put(`${apiUrl}/api/games/${gameId}`,
            {
                name: gameUpdateForm.name,
                mode: gameUpdateForm.mode,
                status: gameUpdateForm.status,
                dm: gameUpdateForm.dm,
            }, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                }
            }).then( async (response) => {
                for (let index = 0; index < newPlayersList.length; index++) {
                    const userToInvite = newPlayersList[index];
                    
                    const oldPlayersLoginList = []
                    for (let index = 0; index < oldPlayersList.length; index++) {
                        oldPlayersLoginList.push(oldPlayersList[index].login);
                    }
                    // if it's a new player invite
                    if (!oldPlayersLoginList.includes(userToInvite.login)) {
                        // axios send Invite
                        axios.post(
                            `${apiUrl}/api/games/${gameId}/users`,
                            {
                                user: userToInvite.id,
                            }, {
                                headers: {
                                    Authorization: `Bearer ${user.token}`,
                                    Accept: 'application/json',
                                }, 
                            }
                        )
                    }
                }

                for (let index = 0; index < oldPlayersList.length; index++) {
                    const userToDeleteInvite = oldPlayersList[index];
                    const newPlayersLoginList = []
                    for (let index = 0; index < newPlayersList.length; index++) {
                        newPlayersLoginList.push(newPlayersList[index].login);
                    }
                    // if a player has been delete from the game
                    if (!newPlayersLoginList.includes(userToDeleteInvite.login)) {
                        // axios send Invite
                        axios.delete(
                            `${apiUrl}/api/games/${gameId}/users/${userToDeleteInvite.id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${user.token}`,
                                    Accept: 'application/json',
                                }, 
                            }
                        )
                    }
                }

                for (let index = 0; index < newUrlsList.length; index++) {
                    const urlToSend = newUrlsList[index];
                    // if it's a new gallery
                    if (!oldUrlsList.includes(urlToSend)) {
                        // if it's not the front
                        if (urlToSend !== newUrlsList[slideNumber]) {
                            // axios send Gallery
                            axios.post(
                                `${apiUrl}/api/galleries`,
                                {
                                    picture: urlToSend,
                                    game: {
                                        id: response.data.id,
                                    }
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${user.token}`,
                                        Accept: 'application/json',
                                    }, 
                                }
                            )
                            // else it's the front
                        } else {
                            axios.post(
                                `${apiUrl}/api/galleries`,
                                {
                                    picture: newUrlsList[slideNumber],
                                    mainPicture: 1,
                                    game: {
                                        id: response.data.id,
                                    }
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${user.token}`,
                                        Accept: 'application/json',
                                    }, 
                                }
                            )
                        }
                    // if the gallery already in
                    } else {
                        // if it's not the new front but was previoulsy
                        if (urlToSend !== newUrlsList[slideNumber] && urlsList[oldUrlsList.indexOf(urlToSend)].mainPicture === 1) {
                            axios.put(
                                `${apiUrl}/api/galleries/${urlsList[oldUrlsList.indexOf(urlToSend)].id}`,
                                {
                                    mainPicture: 0,
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${user.token}`,
                                        Accept: 'application/json',
                                    }, 
                                }
                            )
                        // if it's the new front but wasn't previously
                        } else if (urlToSend === newUrlsList[slideNumber] && urlsList[oldUrlsList.indexOf(urlToSend)].mainPicture === 0) {
                            axios.put(
                                `${apiUrl}/api/galleries/${urlsList[oldUrlsList.indexOf(urlToSend)].id}`,
                                {
                                    mainPicture: 1,
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${user.token}`,
                                        Accept: 'application/json',
                                    }, 
                                }
                            )
                        }
                    }
                }
                for (let index = 0; index < oldUrlsList.length; index++) {
                    const oldUrlToDelete = oldUrlsList[index];
                    // if a gallery has been deleted
                    if (!newUrlsList.includes(oldUrlToDelete)) {
                        axios.delete(
                            `${apiUrl}/api/galleries/${urlsList[oldUrlsList.indexOf(oldUrlToDelete)].id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${user.token}`,
                                    Accept: 'application/json',
                                }, 
                            }
                        )
                    }
                }
            }).then(() => {
                // navigate('/games')
            });
        }
        catch (err) {
            setGameCreateError([...gameCreateError, err.message]);
        }
    }


    // ============================
    // ===== GAMECREATE VERIF =====
    // ============================

    const handleGameCreate = (event) => {
        event.preventDefault();
        let error = false;
        const errorList = [];
        if (gameUpdateForm.name === "") {
            errorList.push("Le nom doit être rempli");
            error = true;
        }
        if (gameUpdateForm.mode === -1){
            errorList.push("Le mode doit être rempli");
            error = true;
        }
        if (error) {
            setGameCreateError(errorList);
            return;
        }
        submitGameCreateForm();
    };


    // ===============================
    // ===== LIST PLAYER INVITE  =====
    // ===============================

    const [modes, setModes] = useState([])
    const modesList = modes[0]

    const [gameUpdateForm, setGameUpdateForm] = useState(
        {
            name: "",
            mode: 0,
            status: 0,
            dm: user.user_id
        }
    );

    const [player, setPlayer] = useState("");
    const [playersList, setPlayersList] = useState([]);
    const [newPlayersList, setNewPlayersList] = useState([]);
    const [oldPlayersList, setOldPlayersList] = useState([]);

    const [usersList, setUsersList] = useState([])

    const fetchUsers = useCallback( async () => {

        // axios => get data (game data) 
        await axios.get(
            `api/games/${gameId}`,
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
                },
            }
        ).then((response) => {
            setGameUpdateForm({...gameUpdateForm, name: response.data.name, mode: response.data.mode.id, status: response.data.status})
        })

        // axios => get data (users data) 
        await axios.get(
            `api/games/${gameId}/users`,
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
                },
            }
        ).then((response) => {
            setPlayersList(...playersList, response.data);
            for (let index = 0; index < response.data.length; index++) {
                newPlayersList.push({id: response.data[index].user.id, login: response.data[index].user.login});
                oldPlayersList.push({id: response.data[index].user.id, login: response.data[index].user.login});
            }
        })

        // axios => get data (mode data) 
        axios.get(
            "api/modes/",
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
                }, 
            }
        ).then((response) => {
            setModes([response.data]);
        })

        // axios => get data (all users)
        await axios.get(
            "api/users/",
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
                }, 
            }
        ).then((response) => {
            // add user data in "user"
            setUsersList(response.data);
        })


        // axios => get data (gallerie data) 
        await axios.get(
            `api/games/${gameId}/galleries`,
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
                },
            }
        ).then((response) => {
                setUrlsList(...urlsList, response.data);
                for (let index = 0; index < response.data.length; index++) {
                    newUrlsList.push(response.data[index].picture);
                    oldUrlsList.push(response.data[index].picture);
                }
        })
    }, [userToken]);
    
    // do it when new render
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            fetchUsers();
            firstRender.current = false;
        } 
    }, [fetchUsers]);

    const loginsList = []
    for (let index = 0; index < usersList.length; index++) {
        loginsList.push(usersList[index].login);
    }
    const playersListLogin = []
    for (let index = 0; index < newPlayersList.length; index++) {
        playersListLogin.push(newPlayersList[index].login);
    }

    const handlePlayerInviteChange = (event) => {
        setPlayer(event.target.value);
    }

    const handlePlayerInviteSubmit = (event) => {
        event.preventDefault();
        setPlayerInviteError([]);
        // check if there is an index inside "loginsList" for "player"
        const indexOf = loginsList.indexOf(player);
        let error = false;
        const errorList = [];
        if (newPlayersList.length === 0) {
            if (indexOf !== -1) {
                addPlayer(player, indexOf);
            } else {
                errorList.push("Joueur non trouvé");
                error = true;
            }
        } else {
            if (indexOf !== -1) {
                if (playersListLogin.includes(player)) {
                    errorList.push("Joueur déjà invité");
                    error = true;
                } else {
                    addPlayer(player, indexOf);
                }
            } else {
                errorList.push("Joueur non trouvé");
                error = true;
            }
        }
        if (error) {
            setPlayerInviteError(errorList);
            return;
        }
        setPlayer("");
    }

    // Add player from newPlayersList
    const addPlayer = (player, indexOf) => {
        const newPlayer = player;
        const idPlayer = usersList[indexOf].id
        setNewPlayersList([...newPlayersList, {id: idPlayer, login: newPlayer}]);
    }

    // Del player from newPlayersList
    const delPlayer = (id) => {
        setNewPlayersList(oldValues => {
            return oldValues.filter(player => player.id !== id)
        })
    }

    // ==============================
    // ===== LIST URLs GALLERY  =====
    // ==============================

    const [url, setUrl] = useState("");

    const handleUrlGalleryChange = (event) => {
        setUrl(event.target.value);
    }
    const [urlsList, setUrlsList] = useState([]);
    const [newUrlsList, setNewUrlsList] = useState([]);
    const [oldUrlsList, setOldUrlsList] = useState([]);
    
    // Add player from playersList
    const addUrl = (url) => {
        setNewUrlsList([...newUrlsList, url]);
    }

    const handleUrlGallerySubmit = (event) => {
        event.preventDefault();
        setUrlGalleryError([]);
        // check if there is an index inside "loginsList" for "player"
        const indexOf = newUrlsList.indexOf(url);
        let error = false;
        const errorList = [];
        if (url === "") {
            errorList.push("Le champ ne peut pas être vide");
            error = true;
        } else {
            if (indexOf === -1) {
                addUrl(url);
                setSlideNumber(0)
            } else {
                errorList.push("URL déjà dans la galerie");
                error = true;
            }
        }
        if (error) {
            setUrlGalleryError(errorList);
            return
        }
        setUrl("");
    }


    // Del player from playersList
    const delUrl = (index) => {
        setNewUrlsList(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
        slideNumber === 0 
            ? setSlideNumber(newUrlsList.length - 2) 
            : setSlideNumber(slideNumber - 1)
    }

    const [slideNumber, setSlideNumber] = useState(0)


    // Previous Image
    const prevSlide = () => {
        slideNumber === 0 
            ? setSlideNumber(newUrlsList.length -1) 
            : setSlideNumber(slideNumber - 1)
    }

    // Next Image  
    const nextSlide = () => {
        slideNumber + 1 === newUrlsList.length 
            ? setSlideNumber(0) 
            : setSlideNumber(slideNumber + 1)
    }


    if (modesList != undefined) {
        var defaultValueMode = modesList?.findIndex(i => i.id === gameUpdateForm.mode)
    }
    if (gameStatus != undefined) {
        var defaultValueStatus = gameStatus?.findIndex(i => i.id === gameUpdateForm.status)
    }


    // =======================
    // ===== GAME DELETE =====
    // =======================

    const gameDelete = () => {
        axios.delete(
            `${apiUrl}/api/games/${gameId}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    Accept: 'application/json',
                }, 
            }
        )
    }

    return (
        <PageWrapper>
            <div className="game-create">
                <h2>Modifier ma partie</h2>
                <div className="game-form-container">
                    <div className="game-form-left">
                        <form id="game-form" className="game-form" onSubmit={handleGameCreate}>
                            <div className="game-form-part">
                                <label htmlFor="game-name">Nom de la Partie :</label>
                                <input
                                    type="text"
                                    id="game-name"
                                    placeholder="Nom de la Partie"
                                    defaultValue={gameUpdateForm.name}
                                    onChange={handleSignUpChangeField}
                                />
                            </div>
                    
                            <div className="game-form-part">
                                <label htmlFor="game-mode">Système de Jeu :</label>
                                <Dropdown
                                    title={mode}
                                    itemToList={modesList}
                                    valueDropdown={updateModeForm}
                                    defaultValue={defaultValueMode}
                                />
                            </div>
                            <div className="game-form-part">
                                <label htmlFor="game-status">Statut de la Partie :</label>
                                <Dropdown
                                    title={status}
                                    itemToList={gameStatus}
                                    valueDropdown={updateStatusForm}
                                    defaultValue={defaultValueStatus}
                                />
                            </div>
                        </form>
                        <div className="game-form-part">
                            <form className="player-list" onSubmit={handlePlayerInviteSubmit}>
                                <label htmlFor="player-list">Liste des Joueurs : </label>
                                <ul className="player-list-ul">
                                    <li>{user.pseudo} <span className="mj">MJ</span></li>
                                    {newPlayersList.map((p) => 
                                        <li className="player-list-li" key={p.id}>
                                            {p.login}
                                            <button onClick={() => delPlayer(p.id)}>d</button>
                                        </li>
                                    )}
                                </ul>
                                <input
                                    type="text"
                                    id="game-invite"
                                    placeholder="Inviter via un Pseudo"
                                    value={player}
                                    onChange={handlePlayerInviteChange}
                                />
                                {playerInviteError.map((e, i) => <p key={`error-${i}`}>{e}</p>)}
                                <button type="submit" className="game-player-form">Inviter</button>
                            </form>
                        </div>
                    </div>
                    <div className="game-form-right">
                        <div className="game-gallery">
                            {newUrlsList.length !== 0 && (
                                <div className="game-gallery-header">
                                    <h3>Front Image :</h3>
                                    <div className="game-gallery-front-container">
                                        <button className="gallery-list-slide-button" onClick={prevSlide}>L</button>
                                        <img className="game-gallery-front" src={newUrlsList[slideNumber]} alt="" />
                                        <button className="gallery-list-slide-button" onClick={nextSlide}>R</button>
                                    </div>
                                    <button className="gallery-list-li-button" onClick={() => delUrl(slideNumber)}>Supprimer</button>
                                </div>
                            )}
                            <form id="gallery-list" className="gallery-list" onSubmit={handleUrlGallerySubmit}>
                                <label htmlFor="gallery-list">Images : </label>
                                <ul className="gallery-list-ul">
                                    {newUrlsList.length > 2 && (
                                        <li className="gallery-list-li">
                                            <img src={
                                            slideNumber === 0
                                                ? newUrlsList[newUrlsList.length - 1]
                                                : newUrlsList[slideNumber - 1]
                                            } alt="" />
                                        </li>
                                    )}
                                    {newUrlsList.length > 0 && (
                                        <li className="gallery-list-li">
                                            <img src={newUrlsList[slideNumber]} alt="" />                                        
                                        </li>
                                    )}
                                    {newUrlsList.length > 1 && (
                                        <li className="gallery-list-li">
                                            <img src={
                                            slideNumber === newUrlsList.length - 1
                                                ? newUrlsList[0]
                                                : newUrlsList[slideNumber + 1]
                                            } alt="" />
                                        </li>
                                    )}
                                </ul>
                                <input
                                    type="url"
                                    id="gallery-url"
                                    placeholder="URL pour la galerie"
                                    value={url}
                                    onChange={handleUrlGalleryChange}
                                />
                                {urlGalleryError.map((e, i) => <p key={`error-${i}`}>{e}</p>)}
                                <button form="gallery-list" type="submit" className="game-gallery-form">Envoyer</button>
                            </form>
                        </div>
                    </div>
                </div>
                {gameCreateError.map((e, i) => <p className="game-form-error" key={`error-${i}`}>{e}</p>)}
                <div className="game-form-footer">
                    <button form="game-form" type="submit" className="game-form-button">Modifier</button>
                    <button onClick={() => {
                        gameDelete();
                        navigate('/games');
                    }} className="game-form-button">Supprimer</button>
                </div>
                <button onClick={() => navigate('/games')} className="game-form-button">Retour</button>
            </div>
        </PageWrapper>

    )
}

export default GameEdit;