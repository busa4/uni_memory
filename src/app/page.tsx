"use client"
import { useState, useEffect } from "react";

const emojiSet = ["💙", "🐳", "🚅", "🐔", "🫀", "🤡", "🌟", "🌝"];

export default function GameHome() {
  const [emojiCards, setEmojiCards] = useState<string[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (completedCards.length === 16) {
      setIsGameOver(true);
    }
  }, [turnCount]);

  const startNewGame = () => {
    randomizeCards();
    setIsGameOver(false);
    setOpenCards([]);
    setCompletedCards([]);
    setTurnCount(0);
  };

  const randomizeCards = () => {
    const duplicatedCards = [...emojiSet, ...emojiSet];
    const randomizedCards = duplicatedCards.sort(() => Math.random() - 0.5);

    setEmojiCards(randomizedCards);
  };

  const handleCardClick = async (index: number) => {
    if (!openCards.includes(index) && openCards.length < 2) {
      const newOpenCards = [...openCards, index];
      setOpenCards(newOpenCards);
  
      if (newOpenCards.length === 2) {
        checkForMatch(newOpenCards);
      }
  
      setTurnCount((prev) => prev + 1);
    }
  };
  
  async function checkForMatch(indices: number[]) {
    const [firstIndex, secondIndex] = indices;
    if (emojiCards[firstIndex] === emojiCards[secondIndex]) {
      setCompletedCards((prev) => [...prev, firstIndex, secondIndex]);
      setOpenCards([]);
    } else {
      await new Promise(resolve => setTimeout(resolve, 700));
      setOpenCards([]);
    }
  }

  return (
    <div className="container">
      <div className="menu">
        <p>{`Moves: ${turnCount}`}</p>
      </div>
      <div className="board">
        {emojiCards.map((card, index) => {
          const isOpen = openCards.includes(index);
          const isMatched = completedCards.includes(index);
          return (
            <div
              onClick={() => handleCardClick(index)}
              key={index}
              className={`card ${isOpen || isMatched ? "active" : ""} ${isMatched ? "matched" : ""} ${isGameOver ? "gameover" : ""}`}
            >
              <div className="card-front">{card}</div>
              <div className="card-back"></div>
            </div>
          );
        })}
      </div>
      <div className="menu">
        <p>{isGameOver ? `Game Over` : ""}</p>
        <button onClick={startNewGame} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}
