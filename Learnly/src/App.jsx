import { useState, useEffect } from "react";

import QuizApp from "./Pages/QuizApp";
import HomePage from "./Pages/HomePage";
import GamePreference from "./Components/Quiz/GamePreference";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // We are prop dilling here, because it's a small application. However, in the future we can use a state management, so as to manage our state and data efficiently across components.

  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );
  // other steps such as category and other user preference would be added later
  const [difficulty, setDifficulty] = useState(["easy", "hard", "medium"]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // State for selected difficulty

  const handleFormSubmission = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  return (
    <div className={`app ${darkMode ? "darkMode" : ""}`}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage handleDarkMode={handleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/quiz"
          element={
            <QuizApp
              selectedDifficulty={selectedDifficulty}
              userName={userName}
            />
          }
        />
        <Route
          path="/game-preference"
          element={
            <GamePreference
              handleFormSubmission={handleFormSubmission}
              userName={userName}
              setUserName={setUserName}
              difficulty={difficulty}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
