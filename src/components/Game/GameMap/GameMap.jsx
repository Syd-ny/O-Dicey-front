import { useSelector } from 'react-redux';
import './GameMap.scss';

const GameMap = () => {
  const { galleries } = useSelector((state) => state.gamestate.game);
  const mainPicture = galleries.filter((i) => i.mainPicture === 1);

  const urlToDisplay = mainPicture[0] !== undefined ? mainPicture[0].picture : "";
  return (
    <div className="game-map">
      <img src={urlToDisplay} />
    </div>
  );
};

export default GameMap;