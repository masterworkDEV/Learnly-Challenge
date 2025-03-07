import { useState, useEffect, useContext } from "react";
import DataContext from "../../Context/DataContext";

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
    setVerifyAnswer(true); // Set user has answered

    if (selectedOption === newQuiz[currentQuestion].correct_answer) {
      setScore(score + 5);
    }

    if (currentQuestion < newQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setVerifyAnswer(false); // Reset for the next question
    } else {
      setShowResult(true);
      console.log("finished");
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
              <svg
                fill="none"
                height="200px"
                width="200px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
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
