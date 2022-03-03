import './Rules.scss'
import Header from '../../components/Header/Header'
import molkkyImg from '../../utils/img/molkky.jpg'
import Footer from '../../components/Footer/Footer';

const Rules = () => {
return (
<div id="Rules" className="Rules">
  <Header />
  <main className='Rules__content'>
    <h1>Règles du jeu</h1>
    <div className='Rules__content__intro'>
      <div className='Rules__img'>
        <img className='Rules__img-img' src={molkkyImg} alt="" />
      </div>
    </div>
    <h2>En bref</h2>
    <div className='intro'>
      <div className='intro__1'>
        <h3>Equipement</h3>
        <ul>
          <li><strong>Douze quilles</strong> en bois de dimensions identiques, marquées de 1 à 12</li>
          <li>Une plus grande quille de lancement appelée le <strong>Mölkky</strong></li>
        </ul>
        <h3>Mise en place</h3>
        <ul>
          <li>Les quilles numérotées sont placées dans une <strong>formation</strong> (voir la <a href='/Skittles'>page
              de placement des quilles</a>)</li>
          <li>Une zone délimitée pour effectuer son lancer à environ 3-4 mètres de la formation des quilles</li>
        </ul>
      </div>
      <div className='intro__2'>
        <h3>Le principe</h3>
        <ul>
          <li>A tour de rôle il faut abattre les quilles numérotées avec le Mölkky</li>
          <li>Après chaque lancer, les quilles sont relevées <strong>à l'endroit où elles se sont immobilisées</strong>
          </li>
          <li>Le premier joueur à atteindre <strong>exactement 50 points</strong> gagne le jeu</li>
        </ul>
        <h3>Système de points</h3>
        <ul>
          <li>Abattre une quille seule rapporte autant de points que son numéro l'indique</li>
          <li>Abattre 2 quilles ou plus, rapporte autant de points que le nombre de quilles abattues</li>
          <li>Un joueur qui dépasse le score de 50, redescend à 25</li>
        </ul>
      </div>
    </div>
    <div className='rules'>
      <div className='rules__1'>
        <div className='rules__1__rule'>
          <h2>Les dimensions officielles</h2>
          <p>
            Un jeu Mölkky authentique est fabriqué à partir de bois de bouleau.
            Les 12 quilles numérotées ont une hauteur 15cm, sont plates à la base
            et biseautées (45°) au sommet. Leur diamètre est 5,9cm. Les quilles
            sont numérotées de 1 à 12 sur leur partie biseautée. La quille de
            lancement a une longueur de 22,5cm et un diamètre de 5,9cm.
          </p>
        </div>
        <div className='rules__1__rule'>
          <h2>Placement et ordre des quilles Mölkky</h2>
          <p>
            Au début d'une partie, les quilles sont placées à <strong>3,50m (+/- 10cm)</strong>
            des joueurs (voir la <a href='/Skittles'>page de placement des quilles</a> pour la formation des quilles).
            Quand une quille a été abattue, elle est relevée (sans la soulever du sol)
            exactement à l'endroit où elle a atterri, avec son numéro face à la
            zone de lancement. C'est ainsi que, pendant le jeu, les quilles se
            dispersent sur le terrain.
          </p>
        </div>
        <div className='rules__1__rule'>
          <h2>Le terrain de jeu</h2>
          <p>
            Le terrain de jeu est délimité par des lignes. Ces lignes sont
            considérées comme indicatives seulement, ce qui signifie qu'elles
            ne peuvent avoir aucun effet sur le système de points comme expliqué ci-dessus.
            Elles n'existent que pour des raisons pratiques - pour éviter que les
            quilles ne se mélangent avec d'autres jeux à proximité. Les quilles qui
            ont été envoyées à l'extérieur du terrain de jeu sont à nouveau placées dans
            le terrain de jeu, perpendiculairement à l'endroit où elles ont atterri et à
            la distance du Mölkky de la limite du terrain de jeu.
          </p>
        </div>
      </div>
      <div className='rules__2'>
        <div className='rules__2__rule'>
          <h2>Une seule manche</h2>
          <p>
            Les joueurs (ou les équipes) jouent chacun à leur tour, essayant
            d'abattre les quilles numérotées en lançant le Mölkky depuis la zone de lancement.
            <strong>Tous les styles de lancer sont autorisés</strong>. Une quille n'est considérée
            comme abattue que si elle est tombée entièrement au sol. Si une quille
            se trouve en équilibre sur une autre quille, le Mölkky ou un bout de terrain
            <strong> naturel</strong> (souche d'arbre, tronc d'arbre ...) elle n'est pas considéré comme abattue.
            Si la quille repose contre un élément <strong>artificiel</strong> (bordure de ciment, banc, ...)
            elle est considérée comme abattue.
          </p>
          <p>Un joueur peut marquer des points de l'une des deux façons suivantes:</p>
          <ul>
            <li>Abattre une quille seule rapporte autant de points que son numéro l'indique</li>
            <li>Abattre 2 quilles ou plus, rapporte autant de points que le nombre de quilles
              abattues (par exemple, en frappant 3 quilles, score de 3 points)</li>
          </ul>
          <p className='endGame'> Le joueur ou l'équipe gagnant est le premier à atteindre exactement 50 points,
            mettant ainsi fin à la partie. Si le score d'un joueur ou de l'équipe dépasse 50 points,
            il est ramené à 25 points. </p>
        </div>
        <div className='rules__2__rule'>
          <h3>Variante avec élimination</h3>
          <p>
            Un joueur qui n'abat aucune quille, 3 fois d'affilée,
            est éliminé de la partie. Dans le cas où tous les joueurs sont éliminés
            avant que quelqu’un atteigne 50 points, le dernier joueur restant gagne.
          </p>
        </div>
        <div className='rules__2__rule'>
          <h3>Variante sans élimination</h3>
          <p>
            Si un joueur qui n'abat aucune quille, 3 fois d'affilée,
            il retombe soit à 0 s'il n'a pas encore dépassé le palier de 25 points,
            soit il retombe au palier de 25 points.
          </p>
        </div>
        <div className='rules__2__rule'>
          <h2>Plusieurs manches</h2>
          <p>
            Un match de Mölkky entre deux équipes se déroule généralement
            au meilleur des trois manches - c'est à dire en deux manches gagnantes.
            Un tirage au sort détermine quelle équipe commence la première manche.
            Après deux manches, en cas d’égalité une manche partout, chaque équipe
            additionne ses points des deux manches. L'équipe qui a marqué le plus
            de points commence la troisième et dernière manche.
          </p>
        </div>
      </div>
    </div>
  </main>
  <Footer/>
</div>
)
}

export default Rules