import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSaveCharacter, actionUpdateCharacterStats } from "../../../actions/gamestate";
import CharacterStatsEdit from "../../CharacterStatsEdit/CharacterStatsEdit";

import './CharacterSheet.scss';
import { isDMSelector } from "../../../selectors/gameSelectors";

const CharacterSheet = () => {
  const dispatch = useDispatch();
  const { currentCharacter } = useSelector((state) => state.gamestate);
  const isDm = useSelector(isDMSelector);
  const [canSave, setCanSave] = useState(false);
  const { stats } = currentCharacter;

  // ! When updating arrays values, be careful that the value is the entire updated array
  const updateStats = (stats) => {
    setCanSave(true);
    dispatch(actionUpdateCharacterStats(stats));
  };

  const handleSave = () => {
    setCanSave(false);
    dispatch(actionSaveCharacter());
  };

  return (
    <section className="game-sheet">

      {!(currentCharacter.id === 0) ? (
        <>
          <header>
            <h2>{currentCharacter.name}</h2>
            <button disabled={!canSave} onClick={handleSave}>Sauvegarder</button>
          </header>
          <CharacterStatsEdit setStats={updateStats} stats={stats} />
        </>
      )
        : (
          <header>
            <h2 style={{textAlign: 'center'}}>Sélectionnez un personnage à afficher</h2>
          </header>
        )
      }
    </section>
  );
};

export default CharacterSheet;