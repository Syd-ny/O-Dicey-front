import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './CharacterCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetCharacterList } from '../../actions/user';
import { Edit, Trash } from 'feather-icons-react/build/IconComponents';
import defaultStats from '../../types/character-stats';
import placeholder from '../../assets/placeholder.png';

const apiUrl = import.meta.env.VITE_API_URL;

const CharacterCard = ({ edit, character, gameName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id: userId, token } = useSelector((state) => state.user);

  const cardStyle = {
    backgroundImage: `url(${character.picture !== '' ? character.picture : placeholder})`,
  };

  const cardClass = edit ? 'character-card character-card-edit' : 'character-card';

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
            <p>{character.stats.hp.current}</p>
          </li>
        </ul>
      </main>
      <footer className="character-card-footer">
        <section className="game-title"><h2>{!edit ? gameName : <Link to={`/games/${character.game.id}`}>{gameName}</Link>}</h2></section>
        <section className="character-actions">
          <button type="button" onClick={() => navigate(`/characters/${character.id}/edit`)}><Edit /></button>
          <button type="button" onClick={() => handleDelete()}><Trash /></button>
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
    stats: defaultStats,
    game: {
      id: 0,
      name: "",
    }
  },
  gameName: "",
};

export default CharacterCard;