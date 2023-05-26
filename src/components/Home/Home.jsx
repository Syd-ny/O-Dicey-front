import './Home.scss';
import Card from '../Card/Card'
import PageWrapper from '../PageWrapper/PageWrapper';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const isLogged = useSelector((state) => state.user.logged);
  return (
    <PageWrapper>
      <main className="home">
        <Card
          title="Avec O’Dicey, l’aventure est à portée de clavier !"
          cardClass='test'
          content="O’Dicey est avant tout destiné aux joueurs de JDRs : néophytes comme chevronnés, l’application se veut facile à prendre en main, et permet une approche rapide de la création de personnages et de parties. Son public cible est donc large, bien qu’elle attirera sans aucun doute en priorité les groupes de joueurs séparés par de longues distances."
        />
        {!isLogged && (<div className='container container-center'>
          <p>En route pour l'aventure ! </p>
          <Link to="/signup" id="signup" className="signup-button signup-button-light">Inscription</Link>
        </div>)}
        <div className='container'>
          <Card
            cardClass='container-article'
            title="Site"
            content="O’Dicey est une application web et mobile, destinée à l’aide de jeux de rôle (JDR). Divisée en deux grands axes, elle propose dans un premier temps une table de jeu virtuelle, où les joueurs (PJ) et le maître du jeu (MJ) pourront centraliser les données relatives à leur partie : fiches de personnages, supports visuels (cartes, artworks), notes prises au cours de l’aventure… Cet espace de jeu sera également équipé d’un système de lancers de dés automatisés, utiles pour le MJ comme les joueurs."
          />
          <div className='container-img'>
              <img src="https://i.imgur.com/OrFFW5K.jpeg" alt="" />
          </div>
        </div>
        {/* <Card
          title="test"
          content="O’Dicey est une application web et mobile, destinée à l’aide de jeux de rôle (JDR). Divisée en deux grands axes, elle propose dans un premier temps une table de jeu virtuelle, où les joueurs (PJ) et le maître du jeu (MJ) pourront centraliser les données relatives à leur partie : fiches de personnages, supports visuels (cartes, artworks), notes prises au cours de l’aventure… Cet espace de jeu sera également équipé d’un système de lancers de dés automatisés, utiles pour le MJ comme les joueurs."
        /> */}
      </main>
    </PageWrapper>
  );
};

export default Home;