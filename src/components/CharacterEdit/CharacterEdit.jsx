import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import defaultStats from '../../types/character-stats';
import './CharacterEdit.scss';
import CharacterCard from '../CharacterCard/CharacterCard';

const apiUrl = import.meta.env.VITE_API_URL;

const CharacterEdit = () => {
  const { charId } = useParams();
  const firstRender = useRef(true);
  const userId = useSelector((state) => state.user.user_id);
  const userToken = useSelector((state) => state.user.token);
  const [game, setGame] = useState("");
  const [character, setCharacter] = useState({
    id: 0,
    picture: "",
    name: "",
    stats: defaultStats,
  });

  const [info, setInfo] = useState(defaultStats.info);

  const [characteristics, setCharacteristics] = useState(defaultStats.characteristics);

  const fetchCharacter = useCallback(async () => {
    const res = await axios.get(`${apiUrl}/api/characters/${charId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
      }
    });
    // sanitization: the API just wants game and user id when making a PUT request
    const sanitizedChar = { ...res.data, game: { id: res.data.game.id }, user: { id: userId } };
    setGame(res.data.game.name);
    setCharacter(sanitizedChar);
  }, [userToken, charId, userId]);

  useEffect(() => {
    if (firstRender.current){
      fetchCharacter();
      firstRender.current = false;
    }
  }, [fetchCharacter]);

  useEffect(() => {
    setInfo(character.stats.info);
    setCharacteristics(character.stats.characteristics)
  }, [character]);

  const changeField = (initialValue, setValue) => {
    return (name, value) => {
      const newValue = { ...initialValue, [name]: value };
      setValue(newValue);
    };
  };

  const changeInfo = (event) => {
    changeField(info, setInfo)(event.target.name, event.target.value);
  };

  const changeCharacteristics = (event) => {
    changeField(characteristics, setCharacteristics)(event.target.name, event.target.value);
  }

  const saveCharacter = async () => {
    try {
      const updatedCharacter = { ...character, stats: { info, characteristics } };
      await axios.put(`${apiUrl}/api/characters/${charId}`, updatedCharacter, {
        headers: {
          'Authorization': `Bearer ${userToken}` ,
          'Content-Type': 'application/json',
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="character-edit">
      <CharacterCard id={character.id} game={game} image={character.picture} name={character.name} characteristics={characteristics} edit />
      <button onClick={() => saveCharacter()}>Sauvegarder</button>
      <section className="character-edit-info">
        <h2>Infos</h2>
        <form className="character-edit-info-form">
          <label htmlFor="name">Nom :</label>
          <input type="text" name="name" id="name" value={info.name} onChange={changeInfo} />
          <label htmlFor="level">Niveau :</label>
          <input type="number" name="level" id="level" value={info.level} onChange={changeInfo} />
          <label htmlFor="class">Classe :</label>
          <input type="text" name="class" id="class" value={info.class} onChange={changeInfo} />
          <label htmlFor="background">Historique :</label>
          <input type="text" name="background" id="background" value={info.background} onChange={changeInfo} />
          <label htmlFor="player_name">Nom du joueur :</label>
          <input type="text" name="player_name" id="player_name" value={info.player_name} onChange={changeInfo} />
          <label htmlFor="alignment">Alignement :</label>
          <input type="text" name="alignment" id="alignment" value={info.alignment} onChange={changeInfo} />
          <label htmlFor="experience">Expérience :</label>
          <input type="number" name="experience" id="experience" value={info.experience} onChange={changeInfo} />
          <label htmlFor="age">Age :</label>
          <input type="number" name="age" id="age" value={info.age} onChange={changeInfo} />
          <label htmlFor="height">Taille(cm) :</label>
          <input type="number" name="height" id="height" value={info.height} onChange={changeInfo} />
          <label htmlFor="weight">Poids(kg) :</label>
          <input type="number" name="weight" id="weight" value={info.weight} onChange={changeInfo} />
          <label htmlFor="eyes">Yeux :</label>
          <input type="text" name="eyes" id="eyes" value={info.eyes} onChange={changeInfo} />
          <label htmlFor="skin">Peau :</label>
          <input type="text" name="skin" id="skin" value={info.skin} onChange={changeInfo} />
          <label htmlFor="hair">Cheveux :</label>
          <input type="text" name="hair" id="hair" value={info.hair} onChange={changeInfo} />
        </form>
      </section>

      <section className="character-edit-characteristics">
        <h2>Caractéristiques</h2>
        <form className="character-edit-characteristics-form">
          <label htmlFor="strength">Force :</label>
          <input type="number" name="strength" id="strength" value={characteristics.strength} onChange={changeCharacteristics} />
          <label htmlFor="dexterity">Dextérité :</label>
          <input type="number" name="dexterity" id="dexterity" value={characteristics.dexterity} onChange={changeCharacteristics} />
          <label htmlFor="constitution">Constitution :</label>
          <input type="number" name="constitution" id="constitution" value={characteristics.constitution} onChange={changeCharacteristics} />
          <label htmlFor="intelligence">Intelligence :</label>
          <input type="number" name="intelligence" id="intelligence" value={characteristics.intelligence} onChange={changeCharacteristics} />
          <label htmlFor="wisdom">Sagesse :</label>
          <input type="number" name="wisdom" id="wisdom" value={characteristics.wisdom} onChange={changeCharacteristics} />
          <label htmlFor="charisma">Charisme :</label>
          <input type="number" name="charisma" id="charisma" value={characteristics.charisma} onChange={changeCharacteristics} />
        </form>
      </section>
    </div>
  );
};

export default CharacterEdit;