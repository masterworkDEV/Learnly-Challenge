import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [headerState, setHeaderState] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNumbersOfQuestion, setSelectedNumbersOfQuestion] = useState(0);
  const [newQuiz, setNewQuiz] = useState([]);
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );
  const [userGender, setUserGender] = useState(
    JSON.parse(localStorage.getItem("gender")) || ""
  );
  const [userProfilePicture, setUserProfilePicture] = useState(
    JSON.parse(localStorage.getItem("profilePicture")) || null
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [verifyAnswer, setVerifyAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [confirmExit, setConfirmExit] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuizes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL);
        const filteredResult = await response.data.results
          .filter((item) => {
            if (item.length > 5) {
              return item.category
                .toLowerCase()
                .includes(selectedCategory.toLowerCase());
            } else {
              return item;
            }
          })
          .slice(0, selectedNumbersOfQuestion);

        console.log(filteredResult);
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
  }, [API_URL, selectedCategory, selectedNumbersOfQuestion]);

  //Quiz object for each question
  const currentQuestionData = newQuiz[currentQuestion];

  return (
    <DataContext.Provider
      value={{
        headerState,
        setHeaderState,
        userName,
        setUserName,
        userProfilePicture,
        setUserProfilePicture,
        userGender,
        setUserGender,
        selectedCategory,
        setSelectedCategory,
        selectedNumbersOfQuestion,
        setSelectedNumbersOfQuestion,
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
        timeLeft,
        setTimeLeft,
        isCorrectAnswer,
        setIsCorrectAnswer,
        isWrongAnswer,
        setIsWrongAnswer,
        showResult,
        setShowResult,
        confirmExit,
        setConfirmExit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
