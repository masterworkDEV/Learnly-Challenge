import { useEffect, useState } from "react";
import Header from "../Components/Home/Header";

import axios from "axios";
import YouTube from "react-youtube";

function Elearn() {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const APIKEY = import.meta.env.VITE_YT_KEY;
  const videoIds = import.meta.env.VITE_VIDEO_ID;
  const displayURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${APIKEY}`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await axios.get(displayURL);
        setVideos(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.log(error);
        setError(`Error something went wrong ${error}`);
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };
    fetchData();
  }, [displayURL]);

  const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
    search
  )}&key=${APIKEY}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(searchURL);
      setVideos(response.data.items);
      setVideoId(response.data.id.videoId);
      console.log(response.data);
      setSearch("");
    } catch (error) {
      console.log(`Couldn't find your search request ${error}`);
      setError(`Error something went wrong ${error}`);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };
  console.log(videoId);

  const opts = {
    playerVars: {
      autoplay: 0,
      height: "300",
      width: "460",
    },
  };

  return (
    <>
      <header>
        <Header />
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
          <ul>
            {videos.map((video) => (
              <li key={video.snippet.channel} className="video-list">
                <YouTube videoId={video.id} opts={opts} className="video" />
                <p>{video.snippet.title}</p>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}

export default Elearn;
