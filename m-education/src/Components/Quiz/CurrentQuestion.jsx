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
      <p>{actveQuestion.question}</p>
    </article>
  );
};

export default CurrentQuestion;
