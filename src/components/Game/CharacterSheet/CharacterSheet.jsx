import { useDispatch, useSelector } from "react-redux";
import { actionSaveCharacter, actionSetCanSave, actionUnsetCanSave, actionUpdateCharacterStats } from "../../../actions/gamestate";
import CharacterStatsEdit from "../../CharacterStatsEdit/CharacterStatsEdit";

import './CharacterSheet.scss';

const CharacterSheet = () => {
  const dispatch = useDispatch();
  const { currentCharacter, canSave } = useSelector((state) => state.gamestate);
  const { stats } = currentCharacter;

  const setCanSave = (status) => {
    if (status) {
      dispatch(actionSetCanSave());
    } else {
      dispatch(actionUnsetCanSave());
    }
  };

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