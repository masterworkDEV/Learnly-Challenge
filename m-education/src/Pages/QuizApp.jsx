import React, { useState, useEffect, useContext } from "react";
import DataContext from "../Context/DataContext";
import QuizHeader from "../Components/Quiz/GameHeader";
import CurrentScore from "../Components/Quiz/CurrentScore";
import CurrentQuestion from "../Components/Quiz/CurrentQuestion";
import Options from "../Components/Quiz/Options";
import Result from "../Components/Quiz/Result";
import ExitQuiz from "../Components/Quiz/ExitQuiz";
import DisplayCorrectAnswer from "../Components/Quiz/DisplayCorrectAnswer";
import DisplayWrongAnswer from "../Components/Quiz/DisplayWrongAnswer";

const QuizApp = ({}) => {
  const {
    headerState,
    setHeaderState,
    confirmExit,
    showResult,
    isCorrectAnswer,
    isWrongAnswer,
  } = useContext(DataContext);

  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);

  return (
    <>
      <QuizHeader />
      {showResult ? (
        <Result />
      ) : (
        <main className="quiz-content">
          <CurrentScore />
          <CurrentQuestion />
          {isCorrectAnswer && <DisplayCorrectAnswer />}
          {isWrongAnswer && (
            <>
              <DisplayWrongAnswer />
            </>
          )}
          <Options />
          {confirmExit && <ExitQuiz />}
        </main>
      )}
    </>
  );
};

export default QuizApp;
