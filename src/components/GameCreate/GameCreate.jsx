import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import "./GameCreate.scss";
import Dropdown from "./Dropdown/Dropdown";
import PageWrapper from "../PageWrapper/PageWrapper";

const GameCreate = () => {

    // const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.user_id);
    const userToken = useSelector((state) => state.user.token);

    const [gameCreateForm, setGameCreateForm] = useState(
        {
        name: "",
        mode: 1,
        status: "",
        dm: userId
    }
    );

    const [gameCreateError, setGameCreateError] = useState([""]);

    const handleSignUpChangeField = (event) => {
        if (gameCreateError.length > 0) setGameCreateError([]); // bad error handling
        // setGameCreateForm({ ...gameCreateForm, [event.target.id]: event.target.value });
        setGameCreateForm({...gameCreateForm, name: event.target.value});
    };


    const submitGameCreateForm = async () => {

        console.log({
            name: gameCreateForm.name,
            mode: {id: 1},
            dm: {id: userId},
            Authorization: `Bearer ${userToken}`,
        })
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            await axios.post(`${apiUrl}/api/games`,
            {
                name: gameCreateForm.name,
                mode: gameCreateForm.mode,
                dm: gameCreateForm.dm,
            }, {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                }
            });
            // setGameCreateError(["Utilisateur créé. Vous pouvez vous connecter."]);
            // setGameCreateForm({
            //     name: "",
            //     mode: "",
            //     status: "",
            // });
        }
        catch (err) {
            setGameCreateError([...gameCreateError, err.message]);
        }
    }


    const handleGameCreate = (event) => {
        event.preventDefault();
        let error = false;
        const errorList = [];
        // if (gameCreateForm.mode === ""){
        //     errorList.push("Le mode doit être rempli");
        //     error = true;
        // }
        // if (gameCreateForm.status === "") {
        //     errorList.push("L'status doit être rempli");
        //     error = true;
        // }
        // if (gameCreateForm.password !== gameCreateForm.checkpassword){
        //     errorList.push("Les mots de passe ne sont pas identiques");
        //     error = true;
        // }
        if (error) {
            setGameCreateError(errorList);
            return;
        }
    
        submitGameCreateForm();
      };




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

    
    return (
        <PageWrapper>
            <div className="game-create">
                <h2>Créer ma partie</h2>

                <form className="game-form" onSubmit={handleGameCreate}>
                    <div className="game-form-left">
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
                        <button type="submit" className="game-form-button">Création</button>
                    </div>

                </form>
            </div>
        </PageWrapper>

    )
}

export default GameCreate;