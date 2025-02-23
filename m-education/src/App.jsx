// import { useState, useEffect } from "react";
// import QuizApp from "./Pages/QuizApp";
// import HomePage from "./Pages/HomePage";

// import Header from "./Components/Header";
// import { Routes, Route, useNavigate } from "react-router-dom";

// // We are prop dilling here, because it's a small application. However, in the future we can use a state management e.g (Context API, Redux, Easy Peasy...)

// const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(
//     JSON.parse(localStorage.getItem("darkMode"))
//   );

//   const [userName, setUserName] = useState("");
//   const [types, setTypes] = useState(["multiple", "boolean"]);
//   const [selectedType, setSelectedType] = useState(""); // State for selected types

//   const [categories, setCategories] = useState([
//     "Science: Computers",
//     "Science: Mathematics",
//     "History",
//     "Geography",
//     "Science: Nature",
//     "General Knowledge",
//     "Entertainment: Music",
//     "Entertainment: Film",
//   ]);
//   const [selectedCategory, setSelectedCategory] = useState(""); // State for selected catgeories
//   const [difficulty, setDifficulty] = useState(["easy", "hard", "medium"]);
//   const [selectedDifficulty, setSelectedDifficulty] = useState(""); // State for selected difficulty

//   const handleFormSubmission = (e) => {
//     e.preventDefault();
//     navigate("/quiz");
//   };

//   const handleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
//   };

// function App() {

//   return (
//     <div className={`app ${darkMode ? "darkMode" : ""}`}>

//     </div>
//   );
// }

// <GamePreference
//             //   handleFormSubmission={handleFormSubmission}
//             //   userName={userName}
//             //   setUserName={setUserName}
//             //   types={types}
//             //   selectedType={selectedType}
//             //   setSelectedType={setSelectedType}
//             //   categories={categories}
//             //   selectedCategory={selectedCategory}
//             //   setSelectedCategory={setSelectedCategory}
//             //   difficulty={difficulty}
//             //   selectedDifficulty={selectedDifficulty}
//             //   setSelectedDifficulty={setSelectedDifficulty}
//             // />
// export default App;

import Header from "./Components/Header";
import Layout from "./Pages/Layout";
import { DataProvider } from "./Context/DataContext";

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Header />

        <Layout />
      </DataProvider>
    </div>
  );
};

export default App;
