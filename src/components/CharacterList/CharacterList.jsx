import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";

import './CharacterList.scss';

const CharacterList = () => {
  const firstRender = useRef(true);
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
    if (firstRender.current){
      fetchCharacters();
      firstRender.current = false;
    }
  }, [fetchCharacters]);

  return (
    <div className="character-list">
      <header className="character-list-header">
        <h2>Mes personnages</h2>
        <input type="search" name="character-search" id="character-search" placeholder="Rechercher un personnage" />
        <button type="button">Nouveau personnage</button>
      </header>
      <section className="character-list-cards">
        {characterList.map((c) => <CharacterCard key={`character-${c.id}`} character={c} />)}
      </section>
      {characterList.length === 0 && <p>Aucun personnage</p>}
    </div>
  );
};

export default CharacterList;