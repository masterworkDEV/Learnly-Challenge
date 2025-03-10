import { useState, useEffect, useContext } from "react";
import DataContext from "../../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Options = () => {
  const {
    currentQuestionData,
    currentQuestion,
    setCurrentQuestion,
    verifyAnswer,
    setVerifyAnswer,
    selectedOption,
    setSelectedOption,
    setScore,
    score,
    setIsCorrectAnswer,
    setIsWrongAnswer,
    setShowResult,
    newQuiz,
  } = useContext(DataContext);
  const [allOptions, setAllOptions] = useState([]);

  useEffect(() => {
    if (currentQuestionData) {
      const combinedOptions = [
        currentQuestionData.correct_answer,
        ...currentQuestionData.incorrect_answers,
      ];
      const shuffledOptions = combinedOptions.sort(() => Math.random() - 0.5);

      setAllOptions(shuffledOptions);
    }
  }, [currentQuestionData]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setVerifyAnswer(true);
    if (option === currentQuestionData.correct_answer) {
      setIsCorrectAnswer(true);
      setIsWrongAnswer(false);
      setTimeout(() => {
        setIsCorrectAnswer(false);
      }, 1500);
    } else {
      setIsWrongAnswer(true);
      setIsCorrectAnswer(false);
      setTimeout(() => {
        setIsWrongAnswer(false);
      }, 1500);
    }
    // if use select an option. they only get to select once
    if (selectedOption) {
      alert("you already pick an option");
      setSelectedOption(null);
      setScore(score);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setVerifyAnswer(true);

    if (selectedOption === newQuiz[currentQuestion].correct_answer) {
      setScore(score + 5);
    }

    if (currentQuestion < newQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setVerifyAnswer(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <form
      className="quiz-form"
      onSubmit={(e) => handleSubmit(e.preventDefault())}
    >
      <ul className="option-list">
        {allOptions.map((option, index) => (
          <li
            className={`option ${
              verifyAnswer && option === currentQuestionData.correct_answer
                ? "correct"
                : selectedOption === option &&
                  verifyAnswer &&
                  option !== currentQuestionData.correct_answer
                ? "wrong"
                : selectedOption === option
                ? "selected"
                : ""
            }`}
            key={index}
            onClick={() => handleOptionChange(option)}
          >
            <h4 htmlFor="option">{option}</h4>
            {selectedOption === option ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                color="rgba(255, 0, 0, 0.804)"
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            )}
          </li>
        ))}
      </ul>
      {newQuiz.length ? (
        <button type="submit">Next</button>
      ) : (
        <button onClick={() => (window.location.href = "/user-profile")}>
          Go bak home
        </button>
      )}
    </form>
  );
};

export default Options;
