import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ handleDarkMode, darkMode }) => {
  return (
    <>
      <header className="main-header">
        <h1>Learnly</h1>
        <button className="toggler" onClick={handleDarkMode}>
          {darkMode ? <i class="bx bx-moon"></i> : <i class="bx bx-sun"></i>}
        </button>
      </header>
      <main className="content">
        <div className="btns">
          <button>
            <Link to="/game-preference">Start Quiz</Link>
          </button>
          <button>
            <Link>About Us</Link>
          </button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
