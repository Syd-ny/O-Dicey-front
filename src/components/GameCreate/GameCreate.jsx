import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import "./GameCreate.scss";
import Dropdown from "./Dropdown/Dropdown";
import PageWrapper from "../PageWrapper/PageWrapper";
import { useNavigate } from "react-router-dom";

const GameCreate = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)


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
            name: "Inactive",
            id: 1,
            class: "orange"
        },
        {
            name: "Terminée",
            id: 2,
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

    const [gameCreateForm, setGameCreateForm] = useState(
        {
            name: "",
            mode: -1,
            status: -1,
            dm: user.user_id
        }
    );


    // Update Status in Form
    const updateStatusForm = (value) => {
        setGameCreateForm({...gameCreateForm, status: value});
    }

    // Update Mode in Form
    const updateModeForm = (value) => {
        setGameCreateForm({...gameCreateForm, mode: value});
    }


    const handleSignUpChangeField = (event) => {
        if (gameCreateError.length > 0) setGameCreateError([]); // bad error handling
        setGameCreateForm({...gameCreateForm, name: event.target.value});
    };
    


    // =====================
    // ===== SEND FORM =====
    // =====================

    const submitGameCreateForm = async () => {

        // axios send Form
        try {
            await axios.post(`${apiUrl}/api/games`,
            {
                name: gameCreateForm.name,
                mode: gameCreateForm.mode,
                dm: gameCreateForm.dm,
            }, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                }
            }).then((response) => {
                for (let index = 0; index < playersList.length; index++) {
                    const userToInviteId = playersList[index].id;
                    
                    // axios send Invite
                    axios.post(
                        `${apiUrl}/api/games/${response.data.id}/users`,
                        {
                            user: userToInviteId,
                        }, {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                Accept: 'application/json',
                            }, 
                        }
                    )
                }
                const urlFront = UrlsList[slideNumber];
                delUrl(slideNumber)

                // axios send Gallery Front
                axios.post(
                    `${apiUrl}/api/galleries`,
                    {
                        picture: urlFront,
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

                for (let index = 0; index < UrlsList.length; index++) {
                    const urlToSend = UrlsList[index];

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
                }
            }).then(() => {
                navigate('/games')
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
        if (gameCreateForm.name === "") {
            errorList.push("Le nom doit être rempli");
            error = true;
        }
        if (gameCreateForm.mode === -1){
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



    const [player, setPlayer] = useState("");
    const [playersList, setPlayersList] = useState([]);

    const [usersList, setUsersList] = useState([])

    const fetchUsers = useCallback( async () => {

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
    for (let index = 0; index < playersList.length; index++) {
        playersListLogin.push(playersList[index].login);
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
        if (playersList.length === 0) {
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

    // Add player from playersList
    const addPlayer = (player, indexOf) => {
        const newPlayer = player;
        const idPlayer = usersList[indexOf].id
        setPlayersList([...playersList, {id: idPlayer, login: newPlayer}]);
    }

    // Del player from playersList
    const delPlayer = (id) => {
        setPlayersList(oldValues => {
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

    const [UrlsList, setUrlsList] = useState([]);

    // Add player from playersList
    const addUrl = (url) => {
        setUrlsList([...UrlsList, url]);
    }

    const handleUrlGallerySubmit = (event) => {
        event.preventDefault();
        setUrlGalleryError([]);
        // check if there is an index inside "loginsList" for "player"
        const indexOf = UrlsList.indexOf(url);
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
        setUrlsList(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
        slideNumber === 0 
            ? setSlideNumber(UrlsList.length - 2) 
            : setSlideNumber(slideNumber - 1)
    }

    const [slideNumber, setSlideNumber] = useState(0)


    // Previous Image
    const prevSlide = () => {
        slideNumber === 0 
            ? setSlideNumber(UrlsList.length -1) 
            : setSlideNumber(slideNumber - 1)
    }

    // Next Image  
    const nextSlide = () => {
        slideNumber + 1 === UrlsList.length 
            ? setSlideNumber(0) 
            : setSlideNumber(slideNumber + 1)
    }

    return (
        <PageWrapper>
            <div className="game-create">
                <h2>Créer ma partie</h2>
                <div className="game-form-container">
                    <div className="game-form-left">
                        <form id="game-form" className="game-form" onSubmit={handleGameCreate}>
                            <div className="game-form-part">
                                <label htmlFor="game-name">Nom de la Partie :</label>
                                <input
                                    type="text"
                                    id="game-name"
                                    placeholder="Nom de la Partie"
                                    value={gameCreateForm.name}
                                    onChange={handleSignUpChangeField}
                                    // onChange={e => this.setGameCreateForm({ name: e.target.value })}
                                />
                            </div>
                    
                            <div className="game-form-part">
                                <label htmlFor="game-mode">Système de Jeu :</label>
                                <Dropdown
                                    title={mode}
                                    itemToList={modesList}
                                    valueDropdown={updateModeForm}
                                />
                            </div>
                            <div className="game-form-part">
                                <label htmlFor="game-status">Statut de la Partie :</label>
                                <p className="game-status-default">En cours</p>
                                {/* <Dropdown
                                    title={status}
                                    itemToList={gameStatus}
                                    valueDropdown={updateStatusForm}
                                /> */}
                            </div>
                        </form>
                        <div className="game-form-part">
                            <form className="player-list" onSubmit={handlePlayerInviteSubmit}>
                                <label htmlFor="player-list">Liste des Joueurs : </label>
                                <ul className="player-list-ul">
                                    <li>{user.pseudo} <span className="mj">MJ</span></li>
                                    {playersList.map((p) => <li className="player-list-li" key={p.id}>{p.login} <button onClick={() => delPlayer(p.id)}>d</button></li>)}
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
                        {/* <div className="game-gallery-part"> */}
                            <div className="game-gallery">
                                {UrlsList.length !== 0 && (
                                <div className="game-gallery-header">
                                    <h3>Front Image :</h3>
                                    <div className="game-gallery-front-container">
                                        <button className="gallery-list-slide-button" onClick={prevSlide}>L</button>
                                        <img className="game-gallery-front" src={UrlsList[slideNumber]} alt="" />
                                        <button className="gallery-list-slide-button" onClick={nextSlide}>R</button>
                                    </div>
                                    <button className="gallery-list-li-button" onClick={() => delUrl(slideNumber)}>Supprimer</button>
                                </div>
                                )}
                                <form id="gallery-list" className="gallery-list" onSubmit={handleUrlGallerySubmit}>
                                    <label htmlFor="gallery-list">Images : </label>
                                    <ul className="gallery-list-ul">
                                        {UrlsList.length > 2 && (
                                        <li className="gallery-list-li">
                                            <img src={
                                            slideNumber === 0
                                                ? UrlsList[UrlsList.length - 1]
                                                : UrlsList[slideNumber - 1]
                                            } alt="" />
                                        </li>
                                        )}
                                        {(UrlsList.length > 0 && <li className="gallery-list-li">
                                            <img src={UrlsList[slideNumber]} alt="" />
                                        </li>
                                        )}
                                        {UrlsList.length > 1 && (<li className="gallery-list-li">
                                            <img src={
                                            slideNumber === UrlsList.length - 1
                                                ? UrlsList[0]
                                                : UrlsList[slideNumber + 1]
                                            } alt="" />
                                        </li>)}
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
                        {/* </div> */}
                    </div>
                </div>
                {gameCreateError.map((e, i) => <p className="game-form-error" key={`error-${i}`}>{e}</p>)}
                <button form="game-form" type="submit" className="game-form-button">Création</button>
            </div>
        </PageWrapper>

    )
}

export default GameCreate;