import { useDispatch, useSelector } from "react-redux";

import './Gallery.scss';
import { actionAddGalleryPicture, actionDeleteGalleryPicture, actionUpdateMainPicture } from "../../../actions/gamestate";
import { useState } from "react";

const Gallery = () => {
  const dispatch = useDispatch();
  const { galleries } = useSelector((state) => state.gamestate.game);
  const [newImage, setNewImage] = useState("");

  const handleSelectImage = (id) => {
    // check if a main picture is set, the middleware handle 0 as a special value
    const mainPicture = galleries.filter((i) => i.mainPicture === 1);
    const oldId = mainPicture.length > 0 ? mainPicture[0].id : 0;
    dispatch(actionUpdateMainPicture(oldId, id));
  };

  const handleDeleteImage = (id) => {
    dispatch(actionDeleteGalleryPicture(id));
  };

  return (
    <section className="game-gallery">
      <h2>Galerie</h2>
      <div className="game-gallery-add">
        <label>Ajouter une image :</label>
        <input
          type="url"
          placeholder="URL de l'image"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button type="button" onClick={() => {
          dispatch(actionAddGalleryPicture(newImage));
          setNewImage("");
        }}>
          Envoyer
        </button>
      </div>
      <div className="game-gallery-images">
        {galleries.map((img) => {
          const elementClass = img.mainPicture === 1 ? 'active' : '';
          return (
            <div key={`gallery-${img.id}`} className="game-gallery-images-item">
              <button type="button" onClick={() => handleDeleteImage(img.id)}>🗑️</button>
              <img className={elementClass} src={img.picture} onClick={() => handleSelectImage(img.id)} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;