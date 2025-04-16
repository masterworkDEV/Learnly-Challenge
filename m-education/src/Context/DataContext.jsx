import { useState, useEffect, createContext } from "react";
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // global states
  const [headerState, setHeaderState] = useState(true);
  const [userGender, setUserGender] = useState(
    JSON.parse(localStorage.getItem("gender")) || ""
  );
  const [userProfilePicture, setUserProfilePicture] = useState(
    JSON.parse(localStorage.getItem("profilePicture")) || null
  );
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );

  // activity logs
  const [recentActivities, setRecentActivities] = useState(
    JSON.parse(localStorage.getItem("activities")) || []
  );

  //E-LEARN states

  const [isLiked, setIsLiked] = useState(
    JSON.parse(localStorage.getItem("liked")) || []
  );

  // quiz app states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNumbersOfQuestion, setSelectedNumbersOfQuestion] = useState(0);
  const [newQuiz, setNewQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [verifyAnswer, setVerifyAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [confirmExit, setConfirmExit] = useState(null);

  // FETCH QUIZES FUNCTION
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuizes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL);
        const filteredResult = await response.data.results
          .filter((item) => {
            if (item.length > 10) {
              return item.category
                .toLowerCase()
                .includes(selectedCategory.toLowerCase());
            } else {
              return item || [];
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
  }, [API_URL, selectedCategory, selectedNumbersOfQuestion]); // track every dependencies and processes

  //Quiz object for each question
  const currentQuestionData = newQuiz[currentQuestion];

  // set new activity
  const addNewActivity = (newActivity) => {
    const activities = [...recentActivities, newActivity];
    setRecentActivities(activities);
    localStorage.setItem("activities", JSON.stringify(activities));
  };

  //call addNewActivity after user submits.
  const handleActivityLog = () => {
    addNewActivity({
      type: "Quiz",
      title: selectedCategory,
      questions: selectedNumbersOfQuestion,
      score: `${score}/${newQuiz.length * 5}`,
      date: new Date().toLocaleDateString(),
    });
    window.location.href = "/user-profile";
  };

  return (
    <DataContext.Provider
      value={{
        // global states
        headerState,
        setHeaderState,
        userName,
        setUserName,
        userProfilePicture,
        setUserProfilePicture,
        userGender,
        setUserGender,

        // activity  states
        handleActivityLog,
        recentActivities,
        isLiked,
        setIsLiked,

        // quiz states
        newQuiz,
        setNewQuiz,
        selectedCategory,
        setSelectedCategory,
        selectedNumbersOfQuestion,
        setSelectedNumbersOfQuestion,
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
