import React, { useState } from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentQuestion, newQuiz, confirmExit, setConfirmExit } =
    useContext(DataContext);

  const handleExitGame = () => {
    setConfirmExit(true);
  };
  return (
    <header className="header-game">
      <nav className="nav">
        <div to="/user-profile" className="nav-link">
          <svg
            onClick={handleExitGame}
            viewBox="0 0 1024 1024"
            fill="none"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"></path>
            </g>
          </svg>
          <p>Previous</p>
        </div>
      </nav>
      <span>
        <b>
          {currentQuestion}/{newQuiz.length}
        </b>
      </span>
    </header>
  );
};

export default Header;
