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
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // API fetch logic

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = await response.data.results.map((quiz) => {
          return {
            ...quiz,
            type: selectedType,
            category: selectedCategory,
            difficulty: selectedDifficulty,
          };
        });
        setQuiz(data);
      } catch (err) {
        if (err.response) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      }
    };

    fetchQuizes();
  }, [API_URL]);

  //initiate timer
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
    setSelectedOption(option);
    setCheckedAnswer(true);

    setTimeout(() => {
      if (option !== quiz[currentQuestion].correct_answer) {
        setCorrectAnswer(false);
      } else {
        setCorrectAnswer(true);

        setTimeout(() => {
          setCorrectAnswer(false);
        }, 1500);
      }
    }, 500);
  };
  const handleSubmit = () => {
    setCheckedAnswer(true); // Set user has answered

    if (selectedOption === quiz[currentQuestion].correct_answer) {
      setScore(score + 30);
    }

    // Move to the next question after a delay (whether correct or incorrect)
    setTimeout(() => {
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setCheckedAnswer(false); // Reset for the next question
      } else {
        setShowResult(true);
        console.log("Quiz Finished");
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(1);
    setSelectedOption(null);
    setScore(0);
    setCheckedAnswer(false);
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
  const currentQuestionData = quiz[currentQuestion];

  return (
    <>
      <Link to="/" className="back-home">
        <i class="bx bx-chevron-left"></i>
        <span>Home</span>
      </Link>

      <main className="game">
        <Header timeLeft={timeLeft} score={score} formatTime={formatTime} />

        {showResult ? (
          <>
            <div className="result-modal">
              <article className="result-commendation">
                <h3 className="username">{userName}</h3>
                <span className="points">
                  <h3>Your score:</h3>
                  <h3 className="score-point">({score})</h3>
                </span>
                <p>
                  Congratulations on this one, we hope you do better in the
                  future
                </p>
                <a href="/">Back home</a>
                {/* can add more better compliments based on condition */}
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
              checkedAnswer={checkedAnswer}
              selectedOption={selectedOption}
              currentQuestionData={currentQuestionData}
              handleOptionChange={handleOptionChange}
            />
            {correctAnswer && (
              <div className="correctAnswer">
                congratulations <b> {selectedOption}</b> is the correct answer{" "}
              </div>
            )}
            <Buttons
              checkedAnswer={checkedAnswer}
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
