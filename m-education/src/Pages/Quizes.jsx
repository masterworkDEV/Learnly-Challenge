import React, { useContext, useEffect, useState } from "react";
import DataContext from "../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Quizes = () => {
  const {
    headerState,
    setHeaderState,
    setSelectedCategory,
    selectedNumbersOfQuestion,
    setSelectedNumbersOfQuestion,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const [category, setCategory] = useState([
    "Sports",
    "Science",
    "Entertainment",
    "Politics",
    "History",
    "General Knowledge",
    "Geography",
  ]);

  const [modal, setModal] = useState(false);
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedNumbersOfQuestion(number);
    navigate("/quiz");
  };

  const handleCloseModal = () => {
    setModal(false);
  };
  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);
  return (
    <div className="quizes">
      <header className="quizes-header">
        <div className="quizes-header-wrapper">
          <Link to="/user-profile">
            <nav className="quizes-nav">
              <FontAwesomeIcon icon={faArrowLeft} color="white" size="1x" />
            </nav>
          </Link>

          <span className="title">Quizes</span>
        </div>
      </header>

      <main className="quiz-category">
        <ul className="category-list">
          {category.length &&
            category.map((cat) => {
              return (
                <li
                  className="list"
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </li>
              );
            })}
        </ul>
        {modal && (
          <>
            <form className="set-question-modal" onSubmit={handleSubmit}>
              <button onClick={handleCloseModal} className="close">
                X
              </button>
              <p>Kindly set questions from 10 -- 50</p>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Set number of questions"
                min="10"
                max="50"
                required
              />
              <button type="submit">Set Question</button>
            </form>
            <div className="overlay"></div>
          </>
        )}
      </main>
    </div>
  );
};

export default Quizes;
