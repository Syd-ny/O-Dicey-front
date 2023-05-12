import './CharacterCardSmall.scss';
import image from '../../assets/berserker.jpg';

const CharacterCardSmall = () => {
  const cardStyle = { backgroundImage: `url(${image})` };

  return (
    <article className="character-card-small" style={cardStyle}>
      <header className="character-card-small-header">
        <section className="character-card-small-header-info">
          <h1 className="character-card-small-header-info-name">Brutus</h1>
          <h2 className="character-card-small-header-info-race">Humain</h2>
          <h2 className="character-card-small-header-info-class">Barbare</h2>
        </section>
        <section className="character-card-small-header-level">
          <h2 className="character-card-small-header-level">4</h2>
        </section>
      </header>
      <main className="character-card-small-main">
        <ul className="character-card-small-main-stats">
          <li>
            <h3>FOR</h3>
            <p>10</p>
          </li>
          <li>
            <h3>DEX</h3>
            <p>10</p>
          </li>
          <li>
            <h3>CON</h3>
            <p>10</p>
          </li>
          <li>
            <h3>SAG</h3>
            <p>10</p>
          </li>
          <li>
            <h3>INT</h3>
            <p>2</p>
          </li>
          <li>
            <h3>CHA</h3>
            <p>10</p>
          </li>
          <li>
            <h3>HP</h3>
            <p>20</p>
          </li>
        </ul>
      </main>
    </article>
  );
};

export default CharacterCardSmall;