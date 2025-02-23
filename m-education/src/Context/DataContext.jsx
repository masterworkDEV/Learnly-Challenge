import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [headerState, setHeaderState] = useState(true);
  const [newQuiz, setNewQuiz] = useState([]);
  const [userName, setUserName] = useState(
    "" || JSON.parse(localStorage.getItem("username"))
  );
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [verifyAnswer, setVerifyAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [confirmExit, setConfirmExit] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuizes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL);
        const filteredResult = await response.data.results.slice(0, 15);

        setNewQuiz(filteredResult);
      } catch (err) {
        if (err.response) {
          console.log(err.message);
          setError(err.message);
        } else {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };
    fetchQuizes();
  }, [API_URL]);

  //Quiz object for each question
  const currentQuestionData = newQuiz[currentQuestion];

  return (
    <DataContext.Provider
      value={{
        headerState,
        setHeaderState,
        userName,
        setUserName,
        newQuiz,
        setNewQuiz,
        currentQuestionData,
        currentQuestion,
        setCurrentQuestion,
        verifyAnswer,
        setVerifyAnswer,
        selectedOption,
        setSelectedOption,
        score,
        setScore,
        confirmExit,
        setConfirmExit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
