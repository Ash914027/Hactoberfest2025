import React, { useState } from "react";
import "./DiceGame.css";

const DiceGame = () => {
  const [diceNumber, setDiceNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const rollDice = () => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNum);

    if (randomNum === 6) {
      setScore(score + 5);
      setMessage("🎉 You rolled a 6! +5 points!");
    } else if (randomNum === 1) {
      setScore(score - 2);
      setMessage("😢 Oops! Rolled a 1! -2 points!");
    } else {
      setScore(score + 1);
      setMessage(`You rolled a ${randomNum} +1 point!`);
    }
  };

  const resetGame = () => {
    setScore(0);
    setDiceNumber(1);
    setMessage("");
  };

  return (
    <div className="game-container">
      <h1 className="title">🎲 Dice Game</h1>
      <div className="dice-box">
        <img
            src={`https://upload.wikimedia.org/wikipedia/commons/${[
              "",
              "1/1b/Dice-1-b.svg",
              "5/5f/Dice-2-b.svg",
              "b/b1/Dice-3-b.svg",
              "f/fd/Dice-4-b.svg",
              "0/08/Dice-5-b.svg",
              "2/26/Dice-6-b.svg",
            ][diceNumber]}`}
            alt={`dice-${diceNumber}`}
            className="dice"
        />

      </div>
      <p className="message">{message}</p>
      <h2 className="score">Score: {score}</h2>
      <div className="buttons">
        <button onClick={rollDice} className="btn-roll">
          Roll Dice 🎲
        </button>
        <button onClick={resetGame} className="btn-reset">
          Reset 🔁
        </button>
      </div>
    </div>
  );
};

export default DiceGame;
