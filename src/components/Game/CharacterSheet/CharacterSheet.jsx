import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './CharacterSheet.scss';
import defaultStats from "../../../types/character-stats";
import { actionSaveCharacter, actionUpdateCharacterStats } from "../../../actions/gamestate";

const CharacterSheet = () => {
  const dispatch = useDispatch();
  const { currentCharacter } = useSelector((state) => state.gamestate);
  const [canSave, setCanSave] = useState(false);
  const { stats } = currentCharacter;

  // ! When updating arrays values, be careful that the value is the entire updated array
  const updateStats = (category, field, value) => {
    setCanSave(true);
    dispatch(actionUpdateCharacterStats({ ...stats, [category]: { ...stats[category], [field]: value } }));
  };

  const handleSave = () => {
    setCanSave(false);
    dispatch(actionSaveCharacter());
  };

  // Utility function for each category
  const updateInfo = (event) => {
    updateStats('info', event.target.id, event.target.value);
  };

  const updateCharacterisitics = (event) => {
    updateStats('characteristics', event.target.id, event.target.value);
  };

  return (
    <section className="game-sheet">
      <header>
        <h2>{currentCharacter.name}</h2>
        <button disabled={!canSave} onClick={handleSave}>Sauvegarder</button>
      </header>
      <section className="game-sheet-section">
        <h2>Informations</h2>

        <label htmlFor="level">Niveau :</label>
        <input type="number" id="level" value={stats.info.level} onChange={updateInfo} />

        <label htmlFor="experience">Expérience :</label>
        <input type="number" id="experience" value={stats.info.experience} onChange={updateInfo} />

        <label htmlFor="class">Classe :</label>
        <input type="text" id="class" value={stats.info.class} onChange={updateInfo} />

        <label htmlFor="race">Race :</label>
        <input type="text" id="race" value={stats.info.race} onChange={updateInfo} />

        <label htmlFor="background">Historique :</label>
        <input type="text" id="background" value={stats.info.background} onChange={updateInfo} />

        <label htmlFor="player_name">Nom du joueur :</label>
        <input type="text" id="player_name" value={stats.info.player_name} onChange={updateInfo} />

        <label htmlFor="alignment">Alignement :</label>
        <input type="text" id="alignment" value={stats.info.alignment} onChange={updateInfo} />

        <label htmlFor="age">Âge :</label>
        <input type="number" id="age" value={stats.info.age} onChange={updateInfo} />

        <label htmlFor="height">Taille (cm) :</label>
        <input type="number" id="height" value={stats.info.height} onChange={updateInfo} />

        <label htmlFor="weight">Poids (kg) :</label>
        <input type="number" id="weight" value={stats.info.weight} onChange={updateInfo} />

        <label htmlFor="eyes">Yeux :</label>
        <input type="text" id="eyes" value={stats.info.eyes} onChange={updateInfo} />

        <label htmlFor="skin">Peau :</label>
        <input type="text" id="skin" value={stats.info.skin} onChange={updateInfo} />

        <label htmlFor="hair">Cheveux :</label>
        <input type="text" id="hair" value={stats.info.hair} onChange={updateInfo} />
      </section>

      <section className="game-sheet-section">
        <h2>Caractéristiques</h2>

        <label htmlFor="strength">Force :</label>
        <input type="number" id="strength" value={stats.characteristics.strength} onChange={updateCharacterisitics} />

        <label htmlFor="dexterity">Dextérité :</label>
        <input type="number" id="dexterity" value={stats.characteristics.dexterity} onChange={updateCharacterisitics} />

        <label htmlFor="constitution">Constitution :</label>
        <input type="number" id="constitution" value={stats.characteristics.constitution} onChange={updateCharacterisitics} />

        <label htmlFor="intelligence">Intelligence :</label>
        <input type="number" id="intelligence" value={stats.characteristics.intelligence} onChange={updateCharacterisitics} />

        <label htmlFor="wisdom">Sagesse :</label>
        <input type="number" id="wisdom" value={stats.characteristics.wisdom} onChange={updateCharacterisitics} />

        <label htmlFor="charisma">Charisma :</label>
        <input type="number" id="charisma" value={stats.characteristics.charisma} onChange={updateCharacterisitics} />
      </section>
    </section>
  );
};

export default CharacterSheet;