import { useSelector } from "react-redux";

import './CharacterSheet.scss';

const CharacterSheet = () => {
  const { currentCharacter } = useSelector((state) => state.gamestate);

  return (
    <section className="game-sheet">
    <header>
      <h2>{currentCharacter.name}</h2>
      <h3>{currentCharacter.stats.info.race}</h3>
      <h3>{currentCharacter.stats.info.class}</h3>
    </header>
    </section>
  );
};

export default CharacterSheet;