import SetProfile from "./SetProfile";
import HomePage from "./HomePage";
import Library from "./Library";
import Books from "./Books";
import SavedCourses from "./SavedCourses";
import Elearn from "./E-Learn";
import Quizes from "./Quizes";
import QuizApp from "./QuizApp";
import MissingPage from "./MissingPage";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {isLoading && (
        <>
          {" "}
          <div className="loader-container">
            <div className="loader-wrap">
              <span class="loader"></span>
              <small>Loading...</small>
            </div>
          </div>
          <div className="overlay white"></div>
        </>
      )}
      <Routes>
        <Route path="/" element={<SetProfile />} />
        <Route path="/user-profile" element={<HomePage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/books" element={<Books />} />
        <Route path="/saved-courses" element={<SavedCourses />} />
        <Route path="/E-learn" element={<Elearn />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </>
  );
};

export default Layout;
