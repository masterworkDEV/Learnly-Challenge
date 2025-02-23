import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import QuizApp from "./QuizApp";
import SetProfile from "./SetProfile";

const Layout = () => {
  return (
    <Routes>
      <Route path="/user-profile" element={<HomePage />} />
      <Route path="/quiz" element={<QuizApp />} />
      <Route path="/" element={<SetProfile />} />
    </Routes>
  );
};

export default Layout;
