import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";

import './CharacterList.scss';

const CharacterList = () => {
  const userId = useSelector((state) => state.user.user_id);
  const userToken = useSelector((state) => state.user.token);
  const [characterList, setCharacterList] = useState([]);

  const fetchCharacters = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${apiUrl}/api/users/${userId}/characters`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
      }
    });
    setCharacterList(res.data);
  }, [userId, userToken]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <div className="character-list">
      <header className="character-list-header">
        <h2>Mes personnages</h2>
        <input type="search" name="character-search" id="character-search" placeholder="Rechercher un personnage" />
        <button type="button">Nouveau personnage</button>
      </header>
      <section className="character-list-cards">
        {characterList.map((c, i) => <CharacterCard key={`character-${i}`} game={c.game.name} image={c.picture} name={c.name} />)}
      </section>
      {characterList.length === 0 && <p>Aucun personnage</p>}
    </div>
  );
};

export default CharacterList;