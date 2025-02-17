import React, { useEffect, useState } from "react";

const GamePreference = ({ userName, setUserName, handleFormSubmission }) => {
  return (
    <main className="game-preference">
      <form className="form" onSubmit={(e) => handleFormSubmission(e)}>
        <label htmlFor="Name">Username</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <button>Continue to game</button>
      </form>
    </main>
  );
};

export default GamePreference;
