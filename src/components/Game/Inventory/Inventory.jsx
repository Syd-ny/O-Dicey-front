import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSaveCharacter, actionSetCanSave, actionUnsetCanSave, actionUpdateInventory } from "../../../actions/gamestate";

// Style is defined in ../Notes/Notes.scss

const Inventory = () => {
  const dispatch = useDispatch();
  const { canSave, currentCharacter } = useSelector((state) => state.gamestate);
  const { inventory } = useSelector((state) => state.gamestate.currentCharacter);

  const setCanSave = (status) => {
    if (status) {
      dispatch(actionSetCanSave());
    } else {
      dispatch(actionUnsetCanSave());
    }
  };

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
      {!(currentCharacter.id === 0) ? (
        <>
          <h2>Inventaire</h2>
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

export default Inventory;