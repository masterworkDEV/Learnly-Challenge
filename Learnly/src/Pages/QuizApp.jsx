import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Components/Quiz/GameHeader";
import Question from "../Components/Quiz/Question";
import Buttons from "../Components/Quiz/Buttons";
import Options from "../Components/Quiz/Options";

const QuizApp = ({
  userName,
  selectedType,
  selectedCategory,
  selectedDifficulty,
}) => {
  const [newQuiz, setNewQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [verifyAnswer, setVerifyAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // 5 minutes in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const response = await axios.get(API_URL);
        const filteredResult = await response.data.results.filter((item) => {
          return item.difficulty
            .toLowerCase()
            .includes(
              selectedDifficulty.toLowerCase(),
              item.type.toLowerCase().includes(selectedType.toLowerCase())
            );
        });
        setNewQuiz(filteredResult);
      } catch (err) {
        if (err.response) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      }
    };

    fetchQuizes();
  }, [API_URL, selectedDifficulty, selectedType]);

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

  // Functions
  const handleOptionChange = (option) => {
    if (option) {
      setSelectedOption(option);
      setVerifyAnswer(true);
    }

    if (selectedOption) {
      alert("you already pick an option");
      setSelectedOption(null);
      setScore(score);
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    setVerifyAnswer(true); // Set user has answered

    if (selectedOption === newQuiz[currentQuestion].correct_answer) {
      setScore(score + 30);
    }

    // Move to the next question after a delay (whether correct or incorrect)

    if (currentQuestion < newQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setVerifyAnswer(false); // Reset for the next question
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(1);
    setSelectedOption(null);
    setScore(0);
    setVerifyAnswer(false);
    setShowResult(false);
    setTimeLeft(300); // Reset timer
  };

  const formatTime = (seconds) => {
    const generateMinutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;
    return `${generateMinutes}: ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  //Quiz object for eachquestion
  const currentQuestionData = newQuiz[currentQuestion];

  return (
    <>
      <nav className="game-nav">
        <Link to="/" className="home">
          <i class="bx bx-chevron-left"></i>
          <span>Home</span>
        </Link>
        <div className="time">
          <span>Time:{formatTime(timeLeft)} </span>
          <i class="bx bx-timer"></i>
        </div>
      </nav>

      <main className="game">
        <Header score={score} />

        {showResult ? (
          <>
            <div className="result-modal">
              <article className="result">
                <span className="username">
                  <h3>{userName}</h3>
                </span>
                <span className="points">
                  <p>You score:</p>
                  <h3 className="score-point">
                    ({score}) out of ({newQuiz.length * 30})
                  </h3>
                </span>
                {score >= 150 ? (
                  <p>
                    Congratulations on this one, we hope you do better in the
                    future
                  </p>
                ) : (
                  <p>
                    Too bad!! kindly retry again and see if you'd score higher
                  </p>
                )}
                <a href="/">Back home</a>
              </article>
            </div>
            <div className="overlay"></div>
          </>
        ) : (
          <>
            <Question
              currentQuestionData={currentQuestionData}
              currentQuestion={currentQuestion}
            />
            <Options
              verifyAnswer={verifyAnswer}
              selectedOption={selectedOption}
              currentQuestionData={currentQuestionData}
              handleOptionChange={handleOptionChange}
            />
            {isCorrectAnswer && (
              <div>
                <p>
                  Correct
                  <b>{newQuiz[currentQuestion].correct_answer} </b>is the
                  correct answer
                </p>
              </div>
            )}
            <Buttons
              verifyAnswer={verifyAnswer}
              handleRestart={handleRestart}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </main>
    </>
  );
};

export default QuizApp;
