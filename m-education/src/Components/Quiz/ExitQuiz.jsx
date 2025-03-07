import React, { useState, useContext } from "react";
import DataContext from "../../Context/DataContext";

const ExitQuiz = () => {
  const {
    setCurrentQuestion,
    setSelectedOption,
    setScore,
    setVerifyAnswer,
    setShowResult,
    setTimeLeft,
    setConfirmExit,
  } = useContext(DataContext);

  const handleRestart = () => {
    setCurrentQuestion(1);
    setSelectedOption(null);
    setScore(0);
    setVerifyAnswer(false);
    setShowResult(false);
    setTimeLeft(300);
    setConfirmExit(null);
    window.location.href = "/quizes";
  };
  const handleContinueGame = () => {
    setConfirmExit(null);
  };
  return (
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
  );
};

export default ExitQuiz;
