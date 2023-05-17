import PropTypes from 'prop-types';

const Dice = ({ sides, updateResultList }) => {
  const roll = (max) => {
    const result = Math.floor(Math.random() * max + 1);
    const time = new Date().toLocaleTimeString('fr-FR', {timeStyle: "short"});
    updateResultList({sides, result, time})
  }

  return (
    <li className="diceroller-choice-list-item" onClick={() => roll(sides)}>D{sides}</li>
  );
};

Dice.propTypes = {
  sides: PropTypes.number.isRequired,
  updateResultList: PropTypes.func.isRequired,
};

export default Dice;