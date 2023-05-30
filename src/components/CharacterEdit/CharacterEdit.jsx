import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddError, actionGetGameList } from '../../actions/user';
import defaultStats from '../../types/character-stats';

import CharacterCard from '../CharacterCard/CharacterCard';
import PageWrapper from '../PageWrapper/PageWrapper';
import CharacterStatsEdit from '../CharacterStatsEdit/CharacterStatsEdit';

import './CharacterEdit.scss';

const apiUrl = import.meta.env.VITE_API_URL;

const CharacterEdit = () => {
  const { charId } = useParams();
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.user_id);
  const userToken = useSelector((state) => state.user.token);

  const [character, setCharacter] = useState({
    id: 0,
    picture: "",
    name: "",
    stats: defaultStats,
    game: {
      id: 0,
      name: ""
    },
  });

  const { games } = useSelector((state) => state.user);
  const [currentGame, setCurrentGame] = useState({ id: 0, name: "" });

  useEffect(() => {
    const findCurrentGame = games.player.filter((g) => g.id === character.game.id)[0];
    if (findCurrentGame !== undefined) setCurrentGame(findCurrentGame);
  }, [games, character]);

  const fetchCharacter = useCallback(async () => {
    const res = await axios.get(`${apiUrl}/api/characters/${charId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
      }
    });
    setCharacter(res.data);
  }, [userToken, charId]);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(actionGetGameList());
      fetchCharacter();
      firstRender.current = false;
    }
  }, [fetchCharacter, dispatch]);


  const setStats = (stats) => {
    setCharacter({ ...character, stats });
  };

  const setCharacterField = (field, value) => {
    setCharacter({ ...character, [field]: value });
  };

  const saveCharacter = async () => {
    try {
      // sanitization: the API just wants game and user id when making a PUT request
      const updatedCharacter = {
        ...character,
        game: { id: character.game.id },
        user: { id: userId }
      };
      const res = await axios.put(`${apiUrl}/api/characters/${charId}`, updatedCharacter, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      });
      navigate("/characters");
    }
    catch (err) {
      dispatch(actionAddError("Erreur lors de la modification du personnage"));
    }
  }

  return (
    <PageWrapper>
      <div className="character-edit">

        <CharacterCard character={character} gameName={currentGame.name} edit />

        <button onClick={() => saveCharacter()}>Sauvegarder</button>

        <section className="character-stats-edit">
          <section className="character-stats-edit-section">
            <h2 className="character-stats-edit-section-heading">&Eacute;tat civil</h2>
            <label htmlFor="name">Nom du personnage :</label>
            <input type="text" id="name" placeholder="Entrez un nom" value={character.name} onChange={(e) => setCharacterField('name', e.target.value)} />
            <label htmlFor="picture">Image du personnage :</label>
            <input type="url" id="picture" placeholder="Entrez l'URL d'une image" value={character.picture} onChange={(e) => setCharacterField('picture', e.target.value)} />
          </section>
        </section>
        
        <CharacterStatsEdit setStats={setStats} stats={character.stats} />
      </div>
    </PageWrapper>
  );
};

export default CharacterEdit;