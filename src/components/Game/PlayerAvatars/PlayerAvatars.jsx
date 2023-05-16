import { useDispatch, useSelector } from 'react-redux';
import './PlayerAvatars.scss';
import { isDMSelector } from '../../../selectors/gameSelectors';
import { actionUpdateCurrentCharacter } from '../../../actions/gamestate';

const PlayerAvatars = () => {
  const dispatch = useDispatch();
  const { characters } = useSelector((state) => state.gamestate.game);
  const isDm = !useSelector(isDMSelector);
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
        {charactersToDisplay.map((c) => 
          <li key={`character-${c.id}`} className="game-avatars-list-item" style={{backgroundImage: `url(${c.picture})`}} onClick={() => handleDisplayCharacter(c)}></li>
        )}
      </ul>
    </div>
  );
};

export default PlayerAvatars;