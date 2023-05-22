import PropTypes from 'prop-types';

import './CharacterCardSmall.scss';

const CharacterCardSmall = ({ character }) => {
  const cardStyle = { backgroundImage: `url(${character.picture})` };

  return (
    <article className="character-card-small" style={cardStyle}>
      <header className="character-card-small-header">
        <section className="character-card-small-header-info">
          <h1 className="character-card-small-header-info-name">{character.name}</h1>
          <h2 className="character-card-small-header-info-race">{character.stats.info.race}</h2>
          <h2 className="character-card-small-header-info-class">{character.stats.info.class}</h2>
        </section>
        <section className="character-card-small-header-level">
          <h2 className="character-card-small-header-level">{character.stats.info.level}</h2>
        </section>
      </header>
      <main className="character-card-small-main">
        <ul className="character-card-small-main-stats">
          <li>
            <h3>FOR</h3>
            <p>{character.stats.characteristics.strength}</p>
          </li>
          <li>
            <h3>DEX</h3>
            <p>{character.stats.characteristics.dexterity}</p>
          </li>
          <li>
            <h3>CON</h3>
            <p>{character.stats.characteristics.constitution}</p>
          </li>
          <li>
            <h3>SAG</h3>
            <p>{character.stats.characteristics.wisdom}</p>
          </li>
          <li>
            <h3>INT</h3>
            <p>{character.stats.characteristics.intelligence}</p>
          </li>
          <li>
            <h3>CHA</h3>
            <p>{character.stats.characteristics.charisma}</p>
          </li>
          <li>
            <h3>HP</h3>
            <p>20</p>
          </li>
        </ul>
      </main>
    </article>
  );
};

CharacterCardSmall.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    picture: PropTypes.string,
    name: PropTypes.string,
    stats: PropTypes.object,
  }),
};

CharacterCardSmall.defaultProps = {
  character: {
    id: 0,
    picture: "",
    name: "",
    stats: {
      info: {
        name: "",
        level: 0,
        class: "",
        background: "",
        player_name: "",
        race: "",
        alignment: "",
        experience: 0,
        age: 0,
        height: 0,
        weight: 0,
        eyes: "",
        skin: "",
        hair: ""
      },
      characteristics: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      }
    },
  },
};

export default CharacterCardSmall;