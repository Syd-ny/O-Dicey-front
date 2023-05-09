import { useState } from 'react';
import PropTypes from 'prop-types';

import './CharacterCard.scss';

import image from '../../assets/berserker.jpg';

const CharacterCard = ({ edit }) => {
  const [characterImage, setCharacterImage] = useState(image);
  const [characterImagePositionX, setCharacterImagePositionX] = useState(50);
  const [characterImagePositionY, setCharacterImagePositionY] = useState(50);
  const [characterImageSize, setCharacterImageSize] = useState(100);

  const cardStyle = {
    backgroundImage: `url(${characterImage})`,
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
        if (newSize <= 200) {
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

  return (
    <article className={cardClass} style={cardStyle}>
      <header className="character-card-header">
        <section className="character-card-header-info">
          <h1 className="character-card-header-info-name">Brutus</h1>
          <h2 className="character-card-header-info-race">Humain</h2>
          <h2 className="character-card-header-info-class">Barbare</h2>
        </section>
        <section className="character-card-header-level">
          <h2 className="character-level">4</h2>
        </section>
      </header>
      <main className="character-card-main">
        <ul className="character-stats">
          <li>
            <h3>FOR</h3>
            <p>10</p>
          </li>
          <li>
            <h3>DEX</h3>
            <p>10</p>
          </li>
          <li>
            <h3>CON</h3>
            <p>10</p>
          </li>
          <li>
            <h3>SAG</h3>
            <p>10</p>
          </li>
          <li>
            <h3>INT</h3>
            <p>2</p>
          </li>
          <li>
            <h3>CHA</h3>
            <p>10</p>
          </li>
          <li>
            <h3>HP</h3>
            <p>20</p>
          </li>
        </ul>
      </main>
      <footer className="character-card-footer">
        <section className="game-title"><h2>Nom de la partie</h2></section>
        <section className="character-actions">
          <button>🖋️</button>
          <button>🗑️</button>
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
};

CharacterCard.defaultProps = {
  edit: false,
};

export default CharacterCard;