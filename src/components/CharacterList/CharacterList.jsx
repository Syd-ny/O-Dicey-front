import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";

import './CharacterList.scss';
import PageWrapper from "../PageWrapper/PageWrapper";
import { actionGetCharacterList } from "../../actions/user";

const CharacterList = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const characterList = useSelector((state) => state.user.characters);


  useEffect(() => {
    if (firstRender.current) {
      dispatch(actionGetCharacterList());
      firstRender.current = false;
    }
  }, [dispatch]);

  return (
    <PageWrapper>
      <div className="character-list">
        <header className="character-list-header">
          <h2>Mes personnages</h2>
          <input type="search" name="character-search" id="character-search" placeholder="Rechercher un personnage" />
          <button type="button">Nouveau personnage</button>
        </header>
        <section className="character-list-cards">
          {characterList.map((c) => <CharacterCard key={`character-${c.id}`} character={c} gameName={c.game.name}/>)}
        </section>
        {characterList.length === 0 && <p>Aucun personnage</p>}
      </div>
    </PageWrapper>
  );
};

export default CharacterList;