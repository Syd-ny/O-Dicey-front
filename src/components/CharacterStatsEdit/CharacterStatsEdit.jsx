import PropTypes from 'prop-types';

import './CharacterStatsEdit.scss';

/**
 * @prop setStats - function that takes an updated stats object and handles it in an appropriate manner according to the context where the component is used
 */
const CharacterStatsEdit = ({ stats, setStats }) => {

  /**
   * Function that wraps setStats to pass the whole updated object
   */
  const updateStats = (category, field, value) => {
    setStats({ ...stats, [category]: { ...stats[category], [field]: value } });
  };

  // Utility function for each category
  const updateInfo = (event) => {
    updateStats('info', event.target.id, event.target.value);
  };

  const updateCharacterisitics = (event) => {
    updateStats('characteristics', event.target.id, event.target.value);
  };

  return (
    <section className="character-stats-edit">
      <section className="character-stats-edit-section">
        <h2 className="character-stats-edit-section-heading">Informations</h2>

        <label htmlFor="level">Niveau :</label>
        <input type="number" id="level" value={stats.info.level} onChange={updateInfo} />

        <label htmlFor="experience">Expérience :</label>
        <input type="number" id="experience" value={stats.info.experience} onChange={updateInfo} />

        <label htmlFor="experience">Points de vie actuels :</label>
        <input type="number" id="experience" value={stats.hp.current} onChange={(e) => {
          updateStats('hp', 'current', e.target.value);
        }} />

        <label htmlFor="class">Classe :</label>
        <input type="text" id="class" value={stats.info.class} onChange={updateInfo} />

        <label htmlFor="race">Race :</label>
        <input type="text" id="race" value={stats.info.race} onChange={updateInfo} />

        <label htmlFor="background">Historique :</label>
        <input type="text" id="background" value={stats.info.background} onChange={updateInfo} />

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

      <section className="character-stats-edit-section">
        <h2 className="character-stats-edit-section-heading">Caractéristiques</h2>

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

        <label htmlFor="charisma">Charisme :</label>
        <input type="number" id="charisma" value={stats.characteristics.charisma} onChange={updateCharacterisitics} />
      </section>
    </section>
  );
};

CharacterStatsEdit.propTypes = {
  stats: PropTypes.object.isRequired,
  setStats: PropTypes.func.isRequired,
};

export default CharacterStatsEdit;