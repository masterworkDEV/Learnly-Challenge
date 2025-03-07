import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../Context/DataContext";

const CurrentQuestion = () => {
  const { currentQuestionData, newQuiz } = useContext(DataContext);
  const [actveQuestion, setActiveQuestion] = useState({});

  useEffect(() => {
    if (currentQuestionData) {
      setActiveQuestion(currentQuestionData);
    }
  }, [currentQuestionData]);
  return (
    <article className="current-question">
      {!newQuiz.length ? (
        <div className="no-question">
          <p>Sorry No Question found!!</p>
          <Link to="/user-profile">back to dashboard</Link>
        </div>
      ) : (
        <p>{actveQuestion.question}</p>
      )}
    </article>
  );
};

export default CurrentQuestion;
