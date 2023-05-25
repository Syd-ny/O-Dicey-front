import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../CharacterCard/CharacterCard";

import './CharacterList.scss';
import PageWrapper from "../PageWrapper/PageWrapper";
import { actionGetCharacterList } from "../../actions/user";
import { useNavigate } from "react-router-dom";

const CharacterList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          <div>
            <h2>Mes personnages</h2>
            <button type="button" onClick={() => navigate("/characters/create")}>Nouveau personnage</button>
          </div>
          <input type="search" name="character-search" id="character-search" placeholder="Rechercher un personnage" />
        </header>
        <section className="character-list-cards">
          {characterList.map((c) => <CharacterCard key={`character-${c.id}`} character={c} gameName={c.game.name}/>)}
        </section>
        {characterList.length === 0 && <p className="none">Aucun personnage</p>}
      </div>
    </PageWrapper>
  );
};

export default CharacterList;