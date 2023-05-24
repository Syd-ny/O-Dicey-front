import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetGameList } from '../../actions/user';
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

  const saveCharacter = async () => {
    try {
      // sanitization: the API just wants game and user id when making a PUT request
      const updatedCharacter = { ...character, game: { id: character.game.id }, user: { id: userId } };
      const res = await axios.put(`${apiUrl}/api/characters/${charId}`, updatedCharacter, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      });
      setCharacter(res.data);
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <PageWrapper>
      <div className="character-edit">

        <CharacterCard character={character} gameName={currentGame.name} edit />

        <button onClick={() => saveCharacter()}>Sauvegarder</button>

        <CharacterStatsEdit setStats={setStats} stats={character.stats} />
      </div>
    </PageWrapper>
  );
};

export default CharacterEdit;