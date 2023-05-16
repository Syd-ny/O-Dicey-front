import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSaveCharacter, actionUpdateNotes } from "../../../actions/gamestate";

import './Notes.scss';

const Notes = () => {
  const dispatch = useDispatch();
  const [canSave, setCanSave] = useState(false);
  const notes = useSelector((state) => state.gamestate.currentCharacter.notes);

  const handleChangeNotes = (event) => {
    setCanSave(true);
    dispatch(actionUpdateNotes(event.target.value));
  };

  const handleSaveNotes = () => {
    setCanSave(false);
    dispatch(actionSaveCharacter());
  };

  return (
    <section className="game-notes">
      <h2>Notes</h2>
      <button disabled={!canSave} onClick={handleSaveNotes}>Sauvegarder</button>
      <textarea value={notes} onChange={handleChangeNotes} />
    </section>
  );
};

export default Notes;