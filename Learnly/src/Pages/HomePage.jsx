import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ handleDarkMode, darkMode }) => {
  return (
    <>
      <header className="main-header">
        <h1>Learnly</h1>
        <button className="toggler" onClick={handleDarkMode}>
          {darkMode ? (
            <i className="bx bx-moon"></i>
          ) : (
            <i className="bx bx-sun"></i>
          )}
        </button>
      </header>
      <main className="content">
        <div className="btns">
          <Link to="/game-preference">
            <button>Start Quiz</button>
          </Link>
          <Link>
            <button>Library</button>
          </Link>

          <Link>
            <button>About Us</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
