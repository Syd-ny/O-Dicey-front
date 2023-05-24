import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./GameEdit.scss";
import Dropdown from "../GameCreate/Dropdown/Dropdown";
import PageWrapper from "../PageWrapper/PageWrapper";

import defaultStats from '../../types/character-stats';

const GameEdit = () => {

    // const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    const location = useLocation();
    const gameId = location.pathname.split("/")[2]



    





    const [gameUpdateForm, setGameUpdateForm] = useState(
        {
            name: "",
            mode: 0,
            status: 0,
            dm: user.user_id
        }
    );


    const updateStatus = (value) => {
        setGameUpdateForm({...gameUpdateForm, status: value});
    }

    const updateMode = (value) => {
        setGameUpdateForm({...gameUpdateForm, mode: value});
    }

    const [gameCreateError, setGameCreateError] = useState([""]);

    const handleSignUpChangeField = (event) => {
        if (gameCreateError.length > 0) setGameCreateError([]); // bad error handling
        // setGameUpdateForm({ ...gameUpdateForm, [event.target.id]: event.target.value });
        setGameUpdateForm({...gameUpdateForm, name: event.target.value});
    };
    

    const submitGameCreateForm = async () => {

        console.log({
            name: gameUpdateForm.name,
            mode: {id: 1},
            dm: {id: user.user_id},
            Authorization: `Bearer ${user.token}`,
        })
        console.log("gameUpdateForm Sent")
        console.log(gameUpdateForm)
        const apiUrl = import.meta.env.VITE_API_URL;
        // try {
        //     await axios.post(`${apiUrl}/api/games`,
        //     {
        //         name: gameUpdateForm.name,
        //         mode: gameUpdateForm.mode,
        //         dm: gameUpdateForm.dm,
        //     }, {
        //         headers: {
        //           Authorization: `Bearer ${user.token}`,
        //         }
        //     });
        //     // setGameCreateError(["Utilisateur créé. Vous pouvez vous connecter."]);
        //     // setGameUpdateForm({
        //     //     name: "",
        //     //     mode: "",
        //     //     status: "",
        //     // });
        // }
        // catch (err) {
        //     setGameCreateError([...gameCreateError, err.message]);
        // }
    }


    // ============================
    // ===== GAMECREATE VERIF =====
    // ============================

    const handleGameCreate = (event) => {
        event.preventDefault();
        let error = false;
        const errorList = [];
        // if (gameUpdateForm.mode === ""){
        //     errorList.push("Le mode doit être rempli");
        //     error = true;
        // }
        // if (gameUpdateForm.status === "") {
        //     errorList.push("L'status doit être rempli");
        //     error = true;
        // }
        // if (gameUpdateForm.password !== gameUpdateForm.checkpassword){
        //     errorList.push("Les mots de passe ne sont pas identiques");
        //     error = true;
        // }
        if (error) {
            setGameCreateError(errorList);
            return;
        }
    
        submitGameCreateForm();
    };


    const userToken = useSelector((state) => state.user.token);
    const apiUrl = import.meta.env.VITE_API_URL

    // const gameStatus = useState([
    //     {
    //         name: "En cours",
    //         id: "ongoing",
    //         class: "green"
    //     },
    //     {
    //         name: "Inactive",
    //         id: "inactive",
    //         class: "orange"
    //     },
    //     {
    //         name: "Terminée",
    //         id: "finish",
    //         class: "red"
    //     }
    // ])

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

    // ===============================
    // ===== LIST PLAYER INVITE  =====
    // ===============================

    const [modes, setModes] = useState([])

    const modesList = modes[0]
    
    const [player, setPlayer] = useState("");
    const [playersList, setPlayersList] = useState([]);

    const [usersList, setUsersList] = useState([])

    const fetchUsers = useCallback( async () => {
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

        await axios.get(
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

        // axios => get data (user data from userId)
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

    const handleChange = (event) => {
        setPlayer(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (playersList.length === 0) {
            if (loginsList.includes(player)) {
                addPlayer(player);
            } else {
                console.log("pas trouvé")
            }
        } else {
            if (loginsList.includes(player)) {
                if (playersList.includes(player)) {
                    console.log('deja invité')
                } else {
                    addPlayer(player);
                }
            } else {
                console.log("pas trouvé")
            }
        }
        setPlayer("");
    }

    const addPlayer = (player) => {
        const newPlayer = player;
        setPlayersList([...playersList, newPlayer]);
    }

    const mode = {
        name : "Mode",
    }
    const status = {
        name : "Statut",
    }


    if (modesList != undefined) {
        var defaultValueMode = modesList?.findIndex(i => i.id === gameUpdateForm.mode)
    }
    if (gameStatus != undefined) {
        var defaultValueStatus = gameStatus?.findIndex(i => i.id === gameUpdateForm.status)
    }

    return (
        <PageWrapper>
            <div className="game-create">
                <h2>Modifier ma partie</h2>
                <div className="game-form-container">
                    <div className="game-form-left">
                        <form className="game-form" onSubmit={handleGameCreate}>
                            <div className="game-form-part">
                                <label htmlFor="game-name">Nom de la Partie :</label>
                                <input
                                    type="text"
                                    id="game-name"
                                    placeholder="Nom de la Partie"
                                    defaultValue={gameUpdateForm.name}
                                    onChange={handleSignUpChangeField}
                                    // onChange={e => this.setGameUpdateForm({ name: e.target.value })}
                                />
                            </div>
                    
                            <div className="game-form-part">
                                <label htmlFor="game-mode">Système de Jeu :</label>
                                <Dropdown
                                    title={mode}
                                    itemToList={modesList}
                                    valueDropdown={updateMode}
                                    defaultValue={defaultValueMode}
                                />
                            </div>
                            <div className="game-form-part">
                                <label htmlFor="game-status">Statut de la Partie :</label>
                                <Dropdown
                                    title={status}
                                    itemToList={gameStatus}
                                    valueDropdown={updateStatus}
                                    defaultValue={defaultValueStatus}
                                />
                            </div>
                            <button type="submit" className="game-form-button">Modifier</button>
                        </form>
                        <div className="game-form-part">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="game-list" className="label__lg">Liste des Joueurs : </label>
                                <ul>
                                    <li>{user.pseudo} <span className="mj">MJ</span></li>
                                    {playersList.map((p) => <li key={`player-${p}`}>{p} <button></button></li>)}
                                </ul>
                                <input
                                    type="text"
                                    id="game-invite"
                                    placeholder="Inviter via un Pseudo"
                                    value={player}
                                    onChange={handleChange}
                                />
                                <button type="submit" className="game-player-form">Inviter</button>
                                </form>
                                <div></div>
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
                                {/* <label className="image-label" htmlFor="image">Parcourir</label> */}
                                {/* <input className="image-input" type="file" id="image" name="image" accept=".jpg .jpeg .png" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>

    )
}

export default GameEdit;