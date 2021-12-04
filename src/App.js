import { useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png" , matched: false},
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // start the game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((item, id) => ({...item, id }));

    setFirstCard(null);
    setSecondCard(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle choice
  const handleChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  }

  // compare the cards

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
      }
      setTimeout(() => resetTurn(), 1000);
    }
  }, [firstCard, secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns(prevTurn => prevTurn + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstCard || card === secondCard || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="turns">Turns: {turns}</div>
    </div>
  );
}

export default App;
