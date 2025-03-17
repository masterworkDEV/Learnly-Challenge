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

  const displayURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${APIKEY}`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await axios.get(displayURL);
        setVideos(response.data.items);
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
      const videosData = response.data.items;
      setVideos(videosData);

      const videoIds = videosData
        .map((item) => {
          if (item.id.videoId) {
            return item.id.videoId;
          } else if (item.id.playlistId) {
            return item.id.playlistId;
          } else if (item.id.channelId) {
            return item.id.channelId;
          }
          setError("No video was found");
          return null;
        })
        .filter((id) => id !== null);

      setVideoId(videoIds);

      setSearch("");
    } catch (error) {
      console.log(`Couldn't find your search request ${error}`);
      setError(`Error something went wrong ${error}`);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };

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
          {isLoading && !error && <p>Loading please wait...</p>}
          {error && <p>Something went wrong ${error}</p>}

          <ul>
            {videos.length ? (
              videos.map((video) => (
                <li key={video.snippet.channel} className="video-list">
                  <YouTube videoId={video.id} opts={opts} className="video" />
                  <p>{video.snippet.title}</p>
                </li>
              ))
            ) : (
              <p className="no-videos">No Videos, kindly search using the search bar</p>
            )}
          </ul>
        </article>
      </main>
    </>
  );
}

export default Elearn;
