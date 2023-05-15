import { useState } from "react";
import Dice from "./Dice";
import './DiceRoller.scss';

const DiceRoller = () => {
  const [results, setResults] = useState([]);

  const updateResults = (result) => {
    setResults([...results, result]);
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
      <section className="diceroller-results">
        <ul className="diceroller-results-list">
          {results.map((r, i) => 
            <li key={i} className="diceroller-results-list-item">
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