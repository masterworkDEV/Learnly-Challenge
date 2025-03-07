import { useContext, useState } from "react";
import DataContext from "../Context/DataContext";

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
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="Layer_2" data-name="Layer 2">
                    {" "}
                    <g id="invisible_box" data-name="invisible box">
                      {" "}
                      <rect width="48" height="48" fill="none"></rect>{" "}
                    </g>{" "}
                    <g id="Layer_7" data-name="Layer 7">
                      {" "}
                      <g>
                        {" "}
                        <path d="M29.7,11.8l1.8,1.9a.8.8,0,0,1,.2.5l-.5,2.6a.5.5,0,0,0,.8.6l2.2-1.2h.6L37,17.4a.5.5,0,0,0,.8-.6l-.5-2.6a.8.8,0,0,1,.2-.5l1.8-1.9a.5.5,0,0,0-.3-.9l-2.5-.4-.4-.3L35,7.8a.6.6,0,0,0-1,0l-1.1,2.4-.4.3-2.5.4A.5.5,0,0,0,29.7,11.8Z"></path>{" "}
                        <path d="M33.9,5.9h.6a1.6,1.6,0,0,0,1.1-.5,1.8,1.8,0,0,0,.4-1,2.1,2.1,0,0,0-.4-1.1,1.8,1.8,0,0,0-2.2,0A2.1,2.1,0,0,0,33,4.5a1.3,1.3,0,0,0,.4,1Z"></path>{" "}
                        <path d="M27.8,7.9a1.4,1.4,0,0,0,1,.4,1.5,1.5,0,0,0,1.1-.4,1.4,1.4,0,0,0,0-2.1L28.5,4.3a1.7,1.7,0,0,0-2.1,0,1.6,1.6,0,0,0,0,2.2Z"></path>{" "}
                        <path d="M25.4,13.5l.5.4h.6a1.6,1.6,0,0,0,1.1-.5,1.8,1.8,0,0,0,.4-1,2.1,2.1,0,0,0-.4-1.1l-.3-.2h-.5a1.8,1.8,0,0,0-1.4.4l-.2.3v.8a.7.7,0,0,0,.1.5Z"></path>{" "}
                        <path d="M27.8,17.1l-1.4,1.4a1.5,1.5,0,0,0,0,2.1,1.4,1.4,0,0,0,1,.5,1.6,1.6,0,0,0,1.1-.5l1.4-1.4a1.5,1.5,0,1,0-2.1-2.1Z"></path>{" "}
                        <path d="M35.8,19.7c-.1-.1-.2-.2-.2-.3a1.8,1.8,0,0,0-2.2,0c0,.1-.1.2-.2.3v.2c0,.1-.1.2-.1.3v.3a1.2,1.2,0,0,0,.4,1,1.5,1.5,0,0,0,2.2,0,1.5,1.5,0,0,0,.4-1v-.3c0-.1-.1-.2-.1-.3A.3.3,0,0,1,35.8,19.7Z"></path>{" "}
                        <path d="M39.1,17.1a1.5,1.5,0,0,0,0,2.1l1.4,1.4a1.6,1.6,0,0,0,1.1.5,1.4,1.4,0,0,0,1-.5,1.4,1.4,0,0,0,0-2.1l-1.4-1.4A1.4,1.4,0,0,0,39.1,17.1Z"></path>{" "}
                        <path d="M41.4,11.4l-.2.3v.8a.7.7,0,0,0,.1.5l.3.5a1.5,1.5,0,0,0,2.2,0l.3-.5a.7.7,0,0,0,.1-.5v-.6a.3.3,0,0,1-.1-.2l-.2-.3A1.8,1.8,0,0,0,41.4,11.4Z"></path>{" "}
                        <path d="M40.2,8.3a1.4,1.4,0,0,0,1-.4l1.4-1.4a1.6,1.6,0,0,0,0-2.2,1.7,1.7,0,0,0-2.1,0L39.1,5.8a1.4,1.4,0,0,0,0,2.1A1.5,1.5,0,0,0,40.2,8.3Z"></path>{" "}
                        <path d="M42.2,31.7a5.2,5.2,0,0,0-4-1.1l-9.9,1.8a4.5,4.5,0,0,0-1.4-3.3L19.8,22H5a2,2,0,0,0-2,2v9a2,2,0,0,0,2,2H8.3l11.2,9.1,20.4-3.7a5,5,0,0,0,2.3-8.7Zm-3,4.8L20.5,39.9,10,31.2V26h8.2l5.9,5.9a.8.8,0,0,1-1.2,1.2l-3.5-3.5a2,2,0,0,0-2.8,2.8l3.5,3.5a4.5,4.5,0,0,0,3.4,1.4,5.7,5.7,0,0,0,1.8-.3h0l13.6-2.4a1.1,1.1,0,0,1,.8.2.9.9,0,0,1,.3.7A1,1,0,0,1,39.2,36.5Z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <span>{score}</span>
            </div>
          </div>
        </header>
      )}
      {userProfileMenu && (
        <>
          <div className="user-menu">
            <button className="exit-menu" onClick={handleExitMenu}>
              <svg
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="3"
                stroke="#000000"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <line x1="8.06" y1="8.06" x2="55.41" y2="55.94"></line>
                  <line x1="55.94" y1="8.06" x2="8.59" y2="55.94"></line>
                </g>
              </svg>
            </button>
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
};

export default Header;
