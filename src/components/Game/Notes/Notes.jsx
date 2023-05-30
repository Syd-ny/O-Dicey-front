import { useDispatch, useSelector } from "react-redux";
import { actionSaveCharacter, actionSetCanSave, actionUnsetCanSave, actionUpdateNotes } from "../../../actions/gamestate";

import './Notes.scss';

const Notes = () => {
  const dispatch = useDispatch();
  const { canSave, currentCharacter } = useSelector((state) => state.gamestate);
  const { notes } = useSelector((state) => state.gamestate.currentCharacter);

  const setCanSave = (status) => {
    if (status) {
      dispatch(actionSetCanSave());
    } else {
      dispatch(actionUnsetCanSave());
    }
  };

  const handleChangeNotes = (event) => {
    setCanSave(true);
    dispatch(actionUpdateNotes(event.target.value));
  };

  const handleSaveNotes = () => {
    setCanSave(false);
    dispatch(actionSaveCharacter());
  };

  // content of notes is nullable, put an empty string if that's the case
  const textareaValue = notes === null ? "" : notes;

  return (
    <section className="game-notes">
      {!(currentCharacter.id === 0) ? (
        <>
          <h2>Notes</h2>
          <button disabled={!canSave} onClick={handleSaveNotes}>Sauvegarder</button>
          <textarea value={textareaValue} onChange={handleChangeNotes} />
        </>
      ) : (
        <header>
          <h2 style={{ textAlign: 'center' }}>Sélectionnez un personnage à afficher</h2>
        </header>
      )}
    </section>
  );
};

export default Notes;