import Dice from "./Dice";
import './DiceRoller.scss';
import { useDispatch, useSelector } from "react-redux";
import { actionAddDiceRoll, actionClearDiceRolls } from "../../../actions/gamestate";

const DiceRoller = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.gamestate.diceRolls );

  const updateResults = (result) => {
    dispatch(actionAddDiceRoll(result));
  };

  return (
    <section className="diceroller">
      <h1 className="diceroller-title">Lancer un dé</h1>
      <section className="diceroller-choice">
        <ul className="diceroller-choice-list">
          <Dice sides={4} updateResultList={updateResults} />
          <Dice sides={6} updateResultList={updateResults} />
          <Dice sides={8} updateResultList={updateResults} />
          <Dice sides={10} updateResultList={updateResults} />
          <Dice sides={12} updateResultList={updateResults} />
          <Dice sides={20} updateResultList={updateResults} />
          <Dice sides={100} updateResultList={updateResults} />
        </ul>
      </section>
      <button onClick={() => dispatch(actionClearDiceRolls())}>Effacer</button>
      <section className="diceroller-results">
        <ul className="diceroller-results-list">
          {results.map((r, i) => 
            <li key={i} className="diceroller-results-list-item">
              <span className="diceroller-results-list-item-time">{r.time}</span>
              <span className="diceroller-results-list-item-sides">Lancé d'un D{r.sides}</span>
              <span className="diceroller-results-list-item-result">{r.result}</span>
            </li>
          )}
        </ul>
      </section>
    </section>
  );
};

export default DiceRoller;