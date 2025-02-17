import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <header className="main-header">
        <h3>Learnly</h3>
        <button className="toggler">
          <i class="bx bx-sun"></i>
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
