import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../Context/DataContext";
import GameHeader from "../Components/Quiz/GameHeader";
import CurrentScore from "../Components/Quiz/CurrentScore";
import CurrentQuestion from "../Components/Quiz/CurrentQuestion";
import Options from "../Components/Quiz/Options";

const QuizApp = ({}) => {
  const {
    headerState,
    setHeaderState,
    confirmExit,
    setConfirmExit,
    setCurrentQuestion,
    setSelectedOption,
    setScore,
    setVerifyAnswer,
  } = useContext(DataContext);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);

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

  const handleRestart = () => {
    setCurrentQuestion(1);
    setSelectedOption(null);
    setScore(0);
    setVerifyAnswer(false);
    setShowResult(false);
    setTimeLeft(300);
    setConfirmExit(null);
    navigate("/user-profile");
  };
  const handleContinueGame = () => {
    setConfirmExit(null);
  };

  const formatTime = (seconds) => {
    const generateMinutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;
    return `${generateMinutes}: ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <>
      <GameHeader />
      <main className="quiz-content">
        <CurrentScore />
        <CurrentQuestion />
        <Options />
        {confirmExit && (
          <>
            <div className="exit-modal">
              <h4>Are you sure you want to quit??</h4>
              <div className="exit-btns">
                <button onClick={handleContinueGame}>No</button>
                <button onClick={handleRestart}>Yes Quit</button>
              </div>
            </div>
            <div className="overlay"></div>
          </>
        )}
      </main>
    </>
  );
};

export default QuizApp;
