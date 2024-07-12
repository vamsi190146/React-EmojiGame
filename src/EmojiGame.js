import React, { useState, useEffect, useCallback } from 'react';

const EmojiGame = () => {
  const emojis = ['😀', '😎', '😊', '🥳', '😇', '😂', '🤣', '😍', '😜', '😉'];
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  const initializeGame = useCallback(() => {
    const initialCards = emojis.concat(emojis).sort(() => Math.random() - 0.5);
    setCards(initialCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
  }, [emojis]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const checkMatch = useCallback(() => {
    const [index1, index2] = flippedIndices;
    if (cards[index1] === cards[index2]) {
      setMatchedIndices((prev) => [...prev, index1, index2]);
    }
    setFlippedIndices([]);
  }, [flippedIndices, cards]);

  const handleClick = useCallback((index) => {
    if (flippedIndices.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    } else {
      setFlippedIndices((prev) => [...prev, index]);
    }
  }, [flippedIndices, checkMatch]);

  const isMatched = useCallback((index) => matchedIndices.includes(index), [matchedIndices]);
  const isFlipped = useCallback((index) => flippedIndices.includes(index) || isMatched(index), [flippedIndices, isMatched]);

  useEffect(() => {
    if (matchedIndices.length === emojis.length * 2) {
      alert('Congratulations! You matched all emojis.');
      initializeGame(); // Reset the game after completion
    }
  }, [matchedIndices, emojis.length, initializeGame]);

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
            <span className="emoji">{isFlipped(index) ? emoji : '❓'}</span>
          </div>
        ))}
      </div>
      <button onClick={initializeGame}>Restart Game</button>
    </div>
  );
};

export default EmojiGame;
