import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../Context/DataContext";

const SetProfile = ({}) => {
  const navigate = useNavigate();
  const { headerState, setHeaderState, userName, setUserName } =
    useContext(DataContext);

  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    navigate("/user-profile");
  };

  return (
    <>
      <main className="profile">
        <div className="logo">
          <span className="logo container">
            <h1 className="text">LEARN</h1>
            <h2 className="nola">Nola</h2>
          </span>
        </div>

        <form onSubmit={(e) => handleFormSubmission(e)}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John Doe..."
            required
          />
          <button type="submit">Start</button>{" "}
        </form>
      </main>
    </>
  );
};

export default SetProfile;
