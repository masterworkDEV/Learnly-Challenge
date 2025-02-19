import React, { useState } from "react";
import { Link } from "react-router-dom";

const GamePreference = ({
  userName,
  setUserName,
  types,
  selectedType,
  setSelectedType,
  categories,
  selectedCategory,
  setSelectedCategory,
  difficulty,
  selectedDifficulty,
  setSelectedDifficulty,
  handleFormSubmission,
}) => {
  return (
    <>
      <Link to="/" className="back-home">
        <i className="bx bx-chevron-left"></i>
        <span>Home</span>
      </Link>
      <main className="game-preference">
        <form className="form" onSubmit={(e) => handleFormSubmission(e)}>
          {" "}
          <label htmlFor="Name">Username</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Type</option>
            {types.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={selectedDifficulty} // Set the value of the select
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            {difficulty.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <button type="submit">Continue to game</button>{" "}
        </form>
      </main>
    </>
  );
};

export default GamePreference;
