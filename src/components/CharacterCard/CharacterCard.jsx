import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './CharacterCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetCharacterList } from '../../actions/user';

const apiUrl = import.meta.env.VITE_API_URL;

const CharacterCard = ({ edit, character, gameName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id: userId, token } = useSelector((state) => state.user);
  const [characterImagePositionX, setCharacterImagePositionX] = useState(50);
  const [characterImagePositionY, setCharacterImagePositionY] = useState(10);
  const [characterImageSize, setCharacterImageSize] = useState(250);

  const cardStyle = {
    backgroundImage: `url(${character.picture})`,
    backgroundPositionX: `${characterImagePositionX}%`,
    backgroundPositionY: `${characterImagePositionY}%`,
    backgroundSize: `${characterImageSize}%`,
  };

  const cardClass = edit ? 'character-card character-card-edit' : 'character-card';

  const setImagePositionX = (direction) => {
    switch (direction) {
      case '+': {
        const newPosition = characterImagePositionX + 1;
        if (newPosition <= 100) {
          setCharacterImagePositionX(newPosition);
        }
        break;
      }
      case '-': {
        const newPosition = characterImagePositionX - 1;
        if (newPosition >= 0) {
          setCharacterImagePositionX(newPosition);
        }
        break;
      }
      default:
        break;
    }
  };

  const setImagePositionY = (direction) => {
    switch (direction) {
      case '+': {
        const newPosition = characterImagePositionY + 1;
        if (newPosition <= 100) {
          setCharacterImagePositionY(newPosition);
        }
        break;
      }
      case '-': {
        const newPosition = characterImagePositionY - 1;
        if (newPosition >= 0) {
          setCharacterImagePositionY(newPosition);
        }
        break;
      }
      default:
        break;
    }
  };

  const setImageSize = (direction) => {
    switch (direction) {
      case '+': {
        const newSize = characterImageSize + 1;
        if (newSize <= 400) {
          setCharacterImageSize(newSize);
        }
        break;
      }
      case '-': {
        const newSize = characterImageSize - 1;
        if (newSize >= 1) {
          setCharacterImageSize(newSize);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
      try {
        await axios.delete(`${apiUrl}/api/characters/${character.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (edit) {
          // if we are editing the character we need to leave the page
          navigate(`/characters`);
        } else {
          // otherwise we reload the character list
          dispatch(actionGetCharacterList());
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <article className={cardClass} style={cardStyle}>
      <header className="character-card-header">
        <section className="character-card-header-info">
          <h1 className="character-card-header-info-name">{character.name}</h1>
          <h2 className="character-card-header-info-race">{character.stats.info.race}</h2>
          <h2 className="character-card-header-info-class">{character.stats.info.class}</h2>
        </section>
        <section className="character-card-header-level">
          <h2 className="character-level">{character.stats.info.level}</h2>
        </section>
      </header>
      <main className="character-card-main">
        <ul className="character-stats">
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
      <footer className="character-card-footer">
        <section className="game-title"><h2>{!edit ? gameName : <Link to={`/games/${character.game.id}`}>{gameName}</Link>}</h2></section>
        <section className="character-actions">
          <button onClick={() => navigate(`/characters/${character.id}/edit`)}>🖋️</button>
          <button onClick={() => handleDelete()}>🗑️</button>
        </section>
        <section className="character-image-edit">
          <section className="character-image-edit-actions">
            <p>X</p>
            <button onClick={() => setImagePositionX('+')}>+</button>
            <button onClick={() => setImagePositionX('-')}>-</button>
          </section>
          <section className="character-image-edit-actions">
            <p>Y</p>
            <button onClick={() => setImagePositionY('+')}>+</button>
            <button onClick={() => setImagePositionY('-')}>-</button>
          </section>
          <section className="character-image-edit-actions">
            <p>Taille</p>
            <button onClick={() => setImageSize('+')}>+</button>
            <button onClick={() => setImageSize('-')}>-</button>
          </section>
        </section>
      </footer>
    </article>
  );
};

CharacterCard.propTypes = {
  edit: PropTypes.bool,
  character: PropTypes.shape({
    id: PropTypes.number,
    picture: PropTypes.string,
    name: PropTypes.string,
    stats: PropTypes.object,
    game: PropTypes.object,
  }),
  gameName: PropTypes.string,
};

CharacterCard.defaultProps = {
  edit: false,
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
    game: {
      id: 0,
      name: "",
    }
  },
  gameName: "",
};

export default CharacterCard;