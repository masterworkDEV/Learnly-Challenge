import React, { useEffect, useState } from "react";

const Question = ({ currentQuestionData, currentQuestion }) => {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    if (currentQuestionData) {
      setQuestion(currentQuestionData);
    }
  }, [currentQuestionData]);

  return (
    <div className="question">
      <h3>Question {currentQuestion}</h3> <p>{question.question}?</p>
    </div>
  );
};

export default Question;
