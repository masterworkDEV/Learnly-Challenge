import React, { useContext, useEffect, useState } from "react";
import DataContext from "../Context/DataContext";

import { useNavigate, Link } from "react-router-dom";

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
    <>
      <header className="quizes-header">
        <div className="quizes-header-wrapper">
          <Link to="/user-profile">
            <nav className="quizes-nav">
              <svg
                viewBox="0 0 1024 1024"
                fill="none"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"></path>
                </g>
              </svg>
            </nav>
          </Link>

          <span className="title">Quizes</span>
        </div>
      </header>

      <main className="quizes">
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
              <p>Kindly set questions from 1 -- 50</p>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Set number of questions"
                minLength={10}
                maxLength={50}
              />
              <button type="submit">Set Question</button>
            </form>
            <div className="overlay"></div>
          </>
        )}
      </main>
    </>
  );
};

export default Quizes;
