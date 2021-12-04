import './Card.scss';

export default function Card({ card, handleChoice }) {

    const handleClick = () => {
        handleChoice(card);
    }

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img 
            className="cover"
            src="../img/cover.png"
            onClick={handleClick}
            alt="cover"
        />
      </div>
    </div>
  );
}
