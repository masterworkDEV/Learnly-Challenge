import { Routes, Route } from "react-router-dom";
import SetProfile from "./SetProfile";
import HomePage from "./HomePage";
import Library from "./Library";
import Books from "./Books";
import SavedCourses from "./SavedCourses";
import Elearn from "./E-Learn";
import Quizes from "./Quizes";
import QuizApp from "./QuizApp";
import MissingPage from "./MissingPage";
import QuizPreference from "../Components/Quiz/QuizPreference";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<SetProfile />} />
      <Route path="/user-profile" element={<HomePage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/books" element={<Books />} />
      <Route path="/saved-courses" element={<SavedCourses />} />
      <Route path="/E-learn" element={<Elearn />} />
      <Route path="/quiz" element={<QuizApp />} />
      <Route path="/quiz-preference" element={<QuizPreference />} />
      <Route path="/quizes" element={<Quizes />} />
      <Route path="*" element={<MissingPage />} />
    </Routes>
  );
};

export default Layout;
