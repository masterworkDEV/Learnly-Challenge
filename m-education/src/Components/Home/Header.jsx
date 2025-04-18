import { useContext, useState } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faMoneyBill,
  faSignOut,
  faTimes,
  faBook,
  faHome,
  faComputer,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { headerState, userName, userProfilePicture, score } =
    useContext(DataContext);

  const [listItems, setListItems] = useState([
    { title: "Home", icon: faHome, link: "/user-profile" },
    { title: "Quizes", icon: faDice, link: "/quizes" },
    { title: "E-learn", icon: faComputer, link: "/E-learn" },
    { title: "Library", icon: faBook, link: "/library" },
    { title: "Saved Courses", icon: faBookOpen, link: "/saved-courses" },
  ]);
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
                <h6 className="profile-name">{userName}</h6>
                <h6>ID: 5234</h6>
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
          <div className="user-menu animate__animated animate__fadeInLeft">
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
                <h4>{userName}</h4>
                <small>Nola points {score}pts</small>
              </div>
              <nav className="user-nav">
                <ul>
                  {listItems.length &&
                    listItems.map((list) => (
                      <li>
                        <FontAwesomeIcon
                          icon={list.icon}
                          size="xl"
                          className="icon"
                          color="#2d6c55"
                        />
                        <Link to={list.link}>{list.title}</Link>
                      </li>
                    ))}
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
          <div className="overlay animate__animated animate__fadeIn"></div>
        </>
      )}
    </>
  );
};

export default Header;
