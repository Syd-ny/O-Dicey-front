import { useDispatch, useSelector } from 'react-redux';
import './PlayerAvatars.scss';
import { isDMSelector } from '../../../selectors/gameSelectors';
import { actionUpdateCurrentCharacter } from '../../../actions/gamestate';
import placeholder from '../../../assets/ten-sided-dice.svg';

const PlayerAvatars = () => {
  const dispatch = useDispatch();
  const { characters } = useSelector((state) => state.gamestate.game);
  const isDm = useSelector(isDMSelector);
  const currentCharacter = useSelector((state) => state.gamestate.currentCharacter);

  const charactersToDisplay = isDm ? characters : characters.filter((c) => c.id !== currentCharacter.id);

  const handleDisplayCharacter = (character) => {
    if (isDm) {
      dispatch(actionUpdateCurrentCharacter(character));
    }
  }

  return (
    <div className="game-avatars">
      <ul className="game-avatars-list">
        {charactersToDisplay.map((c) => {
          const elementClass = isDm && (c.id === currentCharacter.id) ? 'game-avatars-list-item game-avatars-list-item-active' : 'game-avatars-list-item';
          const elementStyle = {
            backgroundImage: `url(${c.picture !== '' ? c.picture : placeholder})`,
            backgroundSize: `${c.picture !== '' ? 'cover' : '55%'}`
          };
          return (
            <li key={`character-${c.id}`} className={elementClass} style={elementStyle} onClick={() => handleDisplayCharacter(c)}>
              <span className="game-avatars-list-item-name">{c.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlayerAvatars;