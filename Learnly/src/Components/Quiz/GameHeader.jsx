import React from "react";

const Header = ({ score, formatTime, timeLeft }) => {
  return (
    <header className="game-header">
      <p>Get 30 Points</p>
      <span className="points">
        <p>Current Points:</p>
        <p>
          <b>{score}</b>
        </p>
      </span>
    </header>
  );
};

export default Header;
