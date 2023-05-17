import { useDispatch, useSelector } from "react-redux";

import './Gallery.scss';
import { actionUpdateMainPicture } from "../../../actions/gamestate";

const Gallery = () => {
  const dispatch = useDispatch();
  const { galleries } = useSelector((state) => state.gamestate.game);

  const handleSelectImage = (id) => {
    // check if a main picture is set, the middleware handle 0 as a special value
    const mainPicture = galleries.filter((i) => i.mainPicture === 1);
    const oldId = mainPicture.length > 0 ? mainPicture[0].id : 0;
    dispatch(actionUpdateMainPicture(oldId, id));
  };

  return (
    <section className="game-gallery">
      <h2>Galerie</h2>
      <div className="game-gallery-images">
        {galleries.map((img) => {
          const elementClass = img.mainPicture === 1 ? 'active' : '';
          return <img key={`gallery-${img.id}`} className={elementClass} src={img.picture} onClick={() => handleSelectImage(img.id)} />
        })}
      </div>
    </section>
  );
};

export default Gallery;