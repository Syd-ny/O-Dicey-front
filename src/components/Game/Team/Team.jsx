import { useDispatch, useSelector } from "react-redux";
import { isDMSelector } from "../../../selectors/gameSelectors";
import { actionUpdateCurrentCharacter } from "../../../actions/gamestate";

import './Team.scss';

const Team = () => {
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
    <section className="game-team">
      <h2>Coterie</h2>
      <div className="game-team-list">
        {charactersToDisplay.map((c) => {
          return (
            <div key={`character-${c.id}`} className="game-team-list-item" onClick={() => handleDisplayCharacter(c)}>
              <h3>{c.name}</h3>
              <h4>{c.stats.info.class}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Team;