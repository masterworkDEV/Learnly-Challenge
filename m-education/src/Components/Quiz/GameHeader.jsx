import { useState, useContext, useEffect } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    currentQuestion,
    newQuiz,
    confirmExit,
    setConfirmExit,
    timeLeft,
    setTimeLeft,
    showResult,
    setShowResult,
  } = useContext(DataContext);

  const handleExitGame = () => {
    setConfirmExit(true);
  };

  useEffect(() => {
    let timer;
    if (!showResult && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResult(true); // Automatically submit when time runs out
    }

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const formatTime = (seconds) => {
    const generateMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${generateMinutes}: ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  useEffect(() => {
    if (!newQuiz.length) {
      setTimeLeft(300);
    }
  }, [timeLeft]);

  return (
    <header className="header-game">
      <nav className="nav">
        <div className="nav-link" onClick={handleExitGame}>
          <svg
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
      <div className="time-container">
        <span>
          <b>Time Left:</b>
        </span>
        <span className="timeleft">{formatTime(timeLeft)}</span>
      </div>
    </header>
  );
};

export default Header;
