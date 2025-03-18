import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import DataContext from "../Context/DataContext";
import { Link } from "react-router-dom";
Link;
import YouTube from "react-youtube";

const SavedCourses = () => {
  const { isLiked } = useContext(DataContext);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
    },
  };

  return (
    <>
      <header className="quizes-header">
        <div className="quizes-header-wrapper">
          <Link to="/user-profile">
            <nav className="quizes-nav">
              <FontAwesomeIcon icon={faArrowLeft} color="#18493e" size="1x" />
            </nav>
          </Link>

          <span>Saved Courses</span>
        </div>
      </header>
      <main>
        <ul className="video-list" id="saved-list">
          {isLiked.map((video) => (
            <li key={video.id.videoId} className="video">
              <YouTube videoId={video.id.videoId} opts={opts} />
              <div className="card-bottom">
                <h4>
                  {video.snippet.title.length < 40
                    ? video.snippet.title
                    : video.snippet.title.slice(0, 40) + "..."}
                </h4>
                <button
                  className="btn"
                  onClick={() => handleSavedVideos(video)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="xl"
                    className="icon"
                    color="transparent"
                    stroke="red"
                    strokeWidth={20}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default SavedCourses;
