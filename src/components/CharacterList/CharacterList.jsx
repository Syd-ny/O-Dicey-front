import CharacterCard from "../CharacterCard/CharacterCard";

import './CharacterList.scss';

const CharacterList = () => {
  return (
    <div className="character-list">
      <header className="character-list-header">
        <h2>Mes personnages</h2>
        <input type="search" name="character-search" id="character-search" placeholder="Rechercher un personnage" />
        <button type="button">Nouveau personnage</button>
      </header>
      <section className="character-list-cards">
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
      </section>
    </div>
  );
};

export default CharacterList;