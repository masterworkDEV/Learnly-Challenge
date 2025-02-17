import { useState, useEffect } from "react";
import axios from "axios";

import QuizApp from "./Pages/QuizApp";
import HomePage from "./Pages/HomePage";
import GamePreference from "./Components/Quiz/GamePreference";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // We are prop dilling here, because it's a small application. However, in the future we can use a state management, so as to manage our state and data efficiently across components.

  const [quiz, setQuiz] = useState([]);
  const [userName, setUserName] = useState("");

  // other steps such as category and other user preference would be added later
  const [difficulty, setDifficulty] = useState([
    {
      stage: "easy",
    },
    {
      stage: "hard",
    },
    {
      stage: "medium",
    },
  ]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  // API fetch logic

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = await response.data.results.slice(1, 21);

        setQuiz(data);
        console.log(data.length);
      } catch (err) {
        if (err.response) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      }
    };
    fetchQuizes();
  }, [API_URL]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/quiz"
          element={
            <QuizApp quiz={quiz} setQuiz={setQuiz} userName={userName} />
          }
        />
        <Route
          path="/game-preference"
          element={
            <GamePreference
              quiz={quiz}
              handleFormSubmission={handleFormSubmission}
              userName={userName}
              setUserName={setUserName}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
