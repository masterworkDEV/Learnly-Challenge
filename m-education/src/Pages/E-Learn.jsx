import { useEffect, useState, useCallback, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { faHeart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DataContext from "../Context/DataContext";

function Elearn() {
  const { isLiked, setIsLiked } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const APIKEY = import.meta.env.VITE_YT_KEY;
  const ids = import.meta.env.VITE_VIDEO_ID;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const displayURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${ids}&key=${APIKEY}`;
        const response = await axios.get(displayURL);
        setVideos(response.data.items);
      } catch (err) {
        console.error("Error fetching initial videos:", err);
        setError("Failed to load initial videos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [APIKEY, ids]);

  const debouncedSearch = useCallback(async () => {
    if (!search.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        search
      )}&key=${APIKEY}`;
      const response = await axios.get(searchURL);
      setVideos(response.data.items);
    } catch (err) {
      console.error("Error searching videos:", err);
      setError("Failed to search videos.");
    } finally {
      setIsLoading(false);
    }
  }, [search, APIKEY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch();
  };

  const opts = {
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
    },
  };

  const handleSavedVideos = (video) => {
    if (video.id !== null) {
      try {
        const isVideoLiked = isLiked.some(
          (item) => item.id.videoId === video.id.videoId
        );

        if (isVideoLiked) {
          alert("You already saved this video");
          return;
        } else {
          setIsLiked((prevLiked) => [...prevLiked, { ...video }]);

          localStorage.setItem(
            "liked",
            JSON.stringify([...isLiked, { ...video }])
          );
          alert(`Video saved sucessfully!`);
          console.log("Video saved to localStorage");
        }
      } catch (error) {
        console.error("Error saving video:", error);
        alert("Error: Something went wrong, cannot save video.");
      }
    }
  };
  return (
    <>
      <header className="page-header learn">
        <div className="page-header-wrapper">
          <Link to="/user-profile">
            <nav className="page-nav">
              <FontAwesomeIcon icon={faArrowLeft} color="#18493e" size="1x" />
            </nav>
          </Link>

          <span className="title learn">E-Learn</span>
        </div>
      </header>
      <main className="e-learn">
        <form className="search-videos" onSubmit={handleSubmit}>
          <label htmlFor="search"></label>
          <input
            type="text"
            placeholder="Search Videos On Youtube"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" role="search" className="btn">
            Search
          </button>
        </form>

        <article className="video-container">
          {isLoading && (
            <>
              <div className="loader-container">
                <span class="loader"></span>
              </div>
              <div className="overlay white"></div>
            </>
          )}
          {error && <p className="text-center">{error}</p>}

          {!isLoading && (
            <p className="text-center">
              {" "}
              <b>{videos.length}</b> videos was found!
            </p>
          )}

          <ul className="video-list">
            {videos.length === 0 && !isLoading && !error && (
              <p>
                {search.trim() ? "No videos found." : "Enter a search term."}
              </p>
            )}
            {videos.map((video) => (
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
        </article>
      </main>
    </>
  );
}
export default Elearn;
