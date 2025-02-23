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
    userName,
    confirmExit,
    setConfirmExit,
    setCurrentQuestion,
    setSelectedOption,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    setVerifyAnswer,
    showResult,
    setShowResult,
  } = useContext(DataContext);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);

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

        {showResult && (
          <>
            <div className="showresult">
              <div
                className="progress-circle"
                style={
                  typeof score === "number" && {
                    background: `conic-gradient(
            #096a4df7 0%,
            #096a4df7 ${score}%, 
            #43b99758 ${score}%,
            #43b99758 100% 
          )`,
                  }
                }
              >
                <div className="progress-circle-inner">
                  <div className="progress-text score">
                    <span className="final-score text">Your Score</span>
                    <span className="final-score score">{score}</span>
                  </div>
                </div>
              </div>
              <div className="message">
                <span className="congrats">Congratulations</span>
                <p className="name">
                  Great job, <b>{userName}!</b> You Did it.
                </p>
              </div>

              <div className="buttons">
                <button>Share</button>
                <button onClick={handleRestart}>Back Home</button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default QuizApp;
