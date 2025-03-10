import { useContext, useState } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBible,
  faDice,
  faMoneyBill,
  faSchool,
  faSignOut,
  faTimes,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { headerState, setHeaderState, userName, userProfilePicture, score } =
    useContext(DataContext);
  const [userProfileMenu, setUserProfileMenu] = useState(false);

  const toggleUserProfileMenu = () => {
    setUserProfileMenu(!userProfileMenu);
  };

  const handleExitMenu = () => {
    setUserProfileMenu(!userProfileMenu);
  };
  return (
    <>
      {headerState && (
        <header className="header">
          <div className="header-wrapper">
            <div className="avatar-wrapper" onClick={toggleUserProfileMenu}>
              <img
                src={userProfilePicture}
                alt="../assets/images/avatar.jpeg"
                className="avatar"
              />
              <div>
                <h5 className="profile-name">{userName}</h5>
                <h5>ID: 5234</h5>
              </div>
            </div>
            <div className="points">
              <FontAwesomeIcon icon={faMoneyBill} size="xl" color="#2d6c55" />
              <h4 className="score">{score}</h4>
            </div>
          </div>
        </header>
      )}
      {userProfileMenu && (
        <>
          <div className="user-menu">
            <button className="exit-menu" onClick={handleExitMenu}>
              <FontAwesomeIcon icon={faTimes} size="xl" />
            </button>

            <div className="container">
              <div className="user-info">
                <img
                  src={userProfilePicture}
                  alt={userName}
                  className="profile-picture"
                />
                <h3>{userName}</h3>
                <small>Nola points {score}pts</small>
              </div>
              <nav className="user-nav">
                <ul>
                  <li>
                    <FontAwesomeIcon
                      icon={faDice}
                      size="xl"
                      className="icon"
                      color="#2d6c55"
                    />
                    <Link to="/quizes">Quizes</Link>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faBook}
                      size="xl"
                      className="icon"
                      color="#2d6c55"
                    />

                    <Link to="/library">Library</Link>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faBookBible}
                      size="xl"
                      className="icon"
                      color="#2d6c55"
                    />

                    <Link to="/dictionary">Dictionary</Link>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faSchool}
                      size="xl"
                      className="icon"
                      color="#2d6c55"
                    />

                    <Link to="/E-learn">E-learn</Link>
                  </li>
                </ul>
              </nav>
              <button onClick={() => (window.location.href = "/")}>
                <FontAwesomeIcon
                  icon={faSignOut}
                  size="xl"
                  className="icon"
                  color="#2d6c55"
                />
                <h3>Log Out</h3>
              </button>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
};

export default Header;
