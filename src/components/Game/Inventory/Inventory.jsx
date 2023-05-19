import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSaveCharacter, actionUpdateInventory } from "../../../actions/gamestate";

// Style is defined in ../Notes/Notes.scss

const Inventory = () => {
  const dispatch = useDispatch();
  const [canSave, setCanSave] = useState(false);
  const { inventory } = useSelector((state) => state.gamestate.currentCharacter);

  const handleChangeNotes = (event) => {
    setCanSave(true);
    dispatch(actionUpdateInventory(event.target.value));
  };

  const handleSaveNotes = () => {
    setCanSave(false);
    dispatch(actionSaveCharacter());
  };

  // content of inventory is nullable, put an empty string if that's the case
  const textareaValue = inventory === null ? "" : inventory;

  return (
    <section className="game-inventory">
      <h2>Inventaire</h2>
      <button disabled={!canSave} onClick={handleSaveNotes}>Sauvegarder</button>
      <textarea value={textareaValue} onChange={handleChangeNotes} />
    </section>
  );
};

export default Inventory;