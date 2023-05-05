import './Home.scss';

const Home = () => {
  return (
    <main>
      <div className='container'>
        <h2>Avec O’Dicey, l’aventure est à portée de clavier !</h2>
        <p>O’Dicey est avant tout destiné aux joueurs de JDRs : néophytes comme chevronnés, l’application se veut facile à prendre en main, et permet une approche rapide de la création de personnages et de parties. Son public cible est donc large, bien qu’elle attirera sans aucun doute en priorité les groupes de joueurs séparés par de longues distances.
</p>
      </div>
      <div className='wrapper'>
        <div className='container container--article'>
          <h2>Site</h2>
          <p>O’Dicey est une application web et mobile, destinée à l’aide de jeux de rôle (JDR). Divisée en deux grands axes, elle propose dans un premier temps une table de jeu virtuelle, où les joueurs (PJ) et le maître du jeu (MJ) pourront centraliser les données relatives à leur partie : fiches de personnages, supports visuels (cartes, artworks), notes prises au cours de l’aventure… Cet espace de jeu sera également équipé d’un système de lancers de dés automatisés, utiles pour le MJ comme les joueurs.</p>
        </div>
        <div className='container container--img'>
            <img src="https://i.imgur.com/wPO6LB2.png" alt="" />
        </div>
      </div>
    </main>
  );
};

export default Home;