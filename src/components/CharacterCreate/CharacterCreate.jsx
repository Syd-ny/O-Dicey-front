import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../PageWrapper/PageWrapper";
import CharacterStatsEdit from "../CharacterStatsEdit/CharacterStatsEdit";
import { actionAddError } from "../../actions/user";

import './CharacterCreate.scss';

const apiUrl = import.meta.env.VITE_API_URL;

const CharacterCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id: userId, token } = useSelector((state) => state.user);
  const [invites, setInvites] = useState([]);
  const [selectedGame, setSelectedGame] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [characterPicture, setCharacterPicture] = useState("");
  const [characterStats, setCharacterStats] = useState(null);
  const [characterNotes, setCharacterNotes] = useState("");
  const [characterInventory, setCharacterInventory] = useState("");

  const fetchInvites = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/users/${userId}/invites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setInvites(res.data);
    }
    catch {
      dispatch(actionAddError("Erreur lors de la récupération des invitations."));
    }
  }, [userId, token, dispatch]);

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);


  const handleSelectGame = (event) => {
    setSelectedGame(event.target.value);
  };

  const fetchGame = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/games/${selectedGame}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setGameData(res.data);
      setCharacterStats(res.data.mode.jsonstats);
    }
    catch {
      dispatch(actionAddError("Erreur lors de la sélection de partie."));
    }
  }, [selectedGame, token, dispatch]);

  useEffect(() => {
    if (selectedGame !== 0) {
      fetchGame();
    }
  }, [selectedGame, fetchGame]);


  const postCharacter = async (gameId) => {
    try {
      await axios.post(`${apiUrl}/api/characters`, {
        user: {
          id: userId,
        },
        game: {
          id: gameId,
        },
        name: characterName,
        picture: characterPicture,
        stats: characterStats,
        inventory: characterInventory,
        notes: characterNotes,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      navigate("/characters");
    }
    catch {
      dispatch(actionAddError("Erreur lors de la création du personnage."));
    }
  };


  return (
    <PageWrapper>
      <section className="character-create">
        <header>
          <h2 className="character-create-heading">Créer un personnage</h2>

          <section className="character-create-game">
            <h2 className="character-create-game-heading">Partie</h2>

            <label htmlFor="game">Sélectionner une partie :</label>

            <select onChange={handleSelectGame} defaultValue="0" id="game">
              <option value="0" disabled>Sélectionner une partie</option>

              {invites.map((invite) => {
                return (
                  <option key={`invite-${invite.id}`} value={invite.game.id}>{invite.game.name}</option>
                );
              })}
            </select>

            {gameData !== null && (
              <section className="character-create-game-data">
                <p className="character-create-game-data-name">{gameData.name}</p>
                <p className="character-create-game-data-dm">MJ : <span>{gameData.dm.login}</span></p>
                <p className="character-create-game-data-mode">{gameData.mode.name}</p>
              </section>
            )}
          </section>

        </header>
        {characterStats !== null && (
          <section className="character-create-form">

            <section className="character-create-form-section">
              <h2 className="character-create-form-section-heading">&Eacute;tat civil</h2>
              <label htmlFor="name">Nom du personnage :</label>
              <input type="text" id="name" placeholder="Entrez un nom" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
              <label htmlFor="picture">Image du personnage :</label>
              <input type="url" id="picture" placeholder="Entrez l'URL d'une image" value={characterPicture} onChange={(e) => setCharacterPicture(e.target.value)} />
            </section>

            <CharacterStatsEdit setStats={setCharacterStats} stats={characterStats} />

            <section className="character-create-form-section">
              <h2 className="character-create-form-section-heading">Inventaire</h2>
              <textarea value={characterInventory} onChange={(e) => setCharacterInventory(e.target.value)} />
            </section>

            <section className="character-create-form-section">
              <h2 className="character-create-form-section-heading">Notes</h2>
              <textarea value={characterNotes} onChange={(e) => setCharacterNotes(e.target.value)} />
            </section>

            <button type="button" onClick={() => postCharacter(gameData.id)}>Créer</button>
          </section>
        )}
      </section>
    </PageWrapper>
  );
};

export default CharacterCreate;