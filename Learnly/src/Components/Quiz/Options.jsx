import React, { useEffect, useState } from "react";

const Options = ({
  currentQuestionData,
  handleOptionChange,
  selectedOption,
  verifyAnswer, // New prop to indicate if the user has submitted an answer
}) => {
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

  if (!currentQuestionData) {
    return <div>Error: No Question was found</div>;
  }

  return (
    <ul className="answers">
      {allOptions.map((option, index) => (
        <div
          className={`option ${selectedOption === option ? "selected" : ""} ${
            selectedOption === option &&
            option !== currentQuestionData.correct_answer
              ? "wrong"
              : ""
          } ${
            verifyAnswer && option === currentQuestionData.correct_answer
              ? "correct"
              : ""
          }`}
          key={index}
          onClick={() => handleOptionChange(option)}
        >
          <b>
            <li></li>
          </b>
          <p>{option}</p>
        </div>
      ))}
    </ul>
  );
};

export default Options;
