import { useState, useEffect, useContext } from "react";
import DataContext from "../../Context/DataContext";

const CurrentQuestion = () => {
  const { currentQuestionData } = useContext(DataContext);
  const [actveQuestion, setActiveQuestion] = useState({});

  useEffect(() => {
    if (currentQuestionData) {
      setActiveQuestion(currentQuestionData);
    }
  }, [currentQuestionData]);
  return (
    <article className="current-question">
      <h4>{actveQuestion.question}</h4>
    </article>
  );
};

export default CurrentQuestion;
