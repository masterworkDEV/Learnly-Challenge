import React, { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const SavedCourses = () => {
  const { isLiked, setIsLiked } = useContext(DataContext);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
    },
  };

  // delete function, would have used ID's but there is an underlying issues when using it but would fix later.
  const handleDelete = (video) => {
    if (video.id !== null) {
      try {
        const likedItems = localStorage.getItem("liked");
        if (likedItems) {
          let likedItemsArray = JSON.parse(likedItems);
          const filterById = likedItemsArray.filter(
            (item) => item.snippet.title !== video.snippet.title
          );
          console.log(filterById);
          localStorage.setItem("liked", JSON.stringify(filterById));
          setIsLiked(filterById);
        }
      } catch (error) {
        console.log("Error cannot delete video", error);
      }
    }
  };
  return (
    <>
      <header className="page-header">
        <div className="page-header-wrapper">
          <Link to="/user-profile">
            <nav className="page-nav">
              <FontAwesomeIcon icon={faArrowLeft} color="#18493e" size="1x" />
            </nav>
          </Link>

          <span className="title"> Courses</span>
        </div>
      </header>
      <main className="saved-courses">
        <ul className="video-list" id="saved-list">
          {isLiked.length > 1 && (
            <div className="text-center">
              <p>
                You have{" "}
                <span>
                  {isLiked.length} <br />
                </span>
                <span>
                  {isLiked.length >= 1 && isLiked.length < 2
                    ? "course"
                    : "courses "}
                </span>
                saved
              </p>
            </div>
          )}
          {isLiked.length ? (
            [...isLiked].reverse().map((video) => (
              <li key={video?.id?.videoId} className="video">
                <YouTube videoId={video?.id?.videoId} opts={opts} />
                <div className="card-bottom">
                  <h4>
                    {video?.snippet?.title.length < 40
                      ? video?.snippet?.title
                      : video?.snippet?.title?.slice(0, 40) + "..."}
                  </h4>
                  <button className="btn" onClick={() => handleDelete(video)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="xl"
                      className="icon"
                      color="transparent"
                      stroke="red"
                      strokeWidth={20}
                    />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <>
              <div className="text-center">
                <p>You haven't liked and saved any video </p>

                <a href="/user-profile">Back home</a>
              </div>
            </>
          )}
        </ul>
      </main>
    </>
  );
};

export default SavedCourses;
