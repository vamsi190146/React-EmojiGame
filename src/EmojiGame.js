import React, { useState, useEffect } from 'react';

const EmojiGame = () => {
  const emojis = ['😀', '😎', '😊', '🥳', '😇', '😂', '🤣', '😍', '😜', '😉'];
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialCards = emojis.concat(emojis).sort(() => Math.random() - 0.5);
    setCards(initialCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
  };

  const handleClick = (index) => {
    if (flippedIndices.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    } else {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  const checkMatch = () => {
    const [index1, index2] = flippedIndices;
    if (cards[index1] === cards[index2]) {
      setMatchedIndices([...matchedIndices, index1, index2]);
    }
    setFlippedIndices([]);
  };

  const isMatched = (index) => matchedIndices.includes(index);
  const isFlipped = (index) => flippedIndices.includes(index) || isMatched(index);

  // Check if all cards are matched
  useEffect(() => {
    if (matchedIndices.length === emojis.length * 2) {
      alert('Congratulations! You matched all emojis.');
      initializeGame(); // Reset the game after completion
    }
  }, [matchedIndices, emojis.length]);

  return (
    <div className="emoji-game">
      <h1>Emoji Memory Game</h1>
      <div className="cards-grid">
        {cards.map((emoji, index) => (
          <div
            key={index}
            className={`card ${isFlipped(index) ? 'flipped' : ''}`}
            onClick={() => !isFlipped(index) && handleClick(index)}
          >
            <span className="emoji">{isFlipped(index) || isMatched(index) ? emoji : '❓'}</span>
          </div>
        ))}
      </div>
      <button onClick={initializeGame}>Restart Game</button>
    </div>
  );
};

export default EmojiGame;
